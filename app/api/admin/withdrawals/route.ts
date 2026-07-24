import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  supabaseAdmin,
} from "@/lib/supabase/admin";

export const runtime = "nodejs";

/* =========================================================
   Verify authenticated TCD admin
========================================================= */

async function getAdmin() {
  const supabase =
    await createClient();

  const {
    data: { user },
    error: authError,
  } =
    await supabase.auth.getUser();

  if (
    authError ||
    !user
  ) {
    return null;
  }

  const {
    data: profile,
    error: profileError,
  } =
    await supabaseAdmin
      .from("users")
      .select(
        `
          id,
          role
        `
      )
      .eq(
        "id",
        user.id
      )
      .maybeSingle();

  if (
    profileError ||
    !profile ||
    profile.role !== "admin"
  ) {
    return null;
  }

  return user;
}

/* =========================================================
   GET — Admin withdrawal list
========================================================= */

export async function GET() {
  try {
    const admin =
      await getAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          error:
            "Admin access required.",
        },
        {
          status: 403,
        }
      );
    }

    /* -----------------------------------------------------
       Load withdrawal requests
    ----------------------------------------------------- */

    const {
      data: withdrawals,
      error: withdrawalError,
    } =
      await supabaseAdmin
        .from(
          "withdraw_requests"
        )
        .select(`
          id,
          user_id,
          amount,
          status,
          reference_number,
          remarks,
          approved_at,
          rejected_at,
          processed_at,
          payout_reference,
          payout_method,
          created_at,
          updated_at
        `)
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .limit(200);

    if (withdrawalError) {
      console.error(
        "ADMIN WITHDRAWALS LOAD ERROR:",
        withdrawalError
      );

      return NextResponse.json(
        {
          error:
            "Unable to load withdrawals.",
        },
        {
          status: 500,
        }
      );
    }


    /* -----------------------------------------------------
       Collect unique student IDs
    ----------------------------------------------------- */

    const userIds =
      [
        ...new Set(
          withdrawals.map(
            (withdrawal) =>
              withdrawal.user_id
          )
        ),
      ];

    /* -----------------------------------------------------
       Load student profiles
    ----------------------------------------------------- */

    const {
      data: users,
      error: usersError,
    } =
      await supabaseAdmin
        .from("users")
        .select(`
          id,
          name,
          email,
          mobile
        `)
        .in(
          "id",
          userIds
        );

    if (usersError) {
      console.error(
        "ADMIN WITHDRAWAL USERS ERROR:",
        usersError
      );

      return NextResponse.json(
        {
          error:
            "Unable to load withdrawal users.",
        },
        {
          status: 500,
        }
      );
    }

    /* -----------------------------------------------------
       Load active payout accounts
    ----------------------------------------------------- */

    const {
      data: payoutAccounts,
      error: payoutAccountsError,
    } =
      await supabaseAdmin
        .from(
          "payout_accounts"
        )
        .select(`
          id,
          user_id,
          account_type,
          account_holder_name,
          upi_id,
          bank_account_number,
          ifsc_code,
          is_verified,
          is_active,
          verified_at,
          created_at
        `)
        .in(
          "user_id",
          userIds
        )
        .eq(
          "is_active",
          true
        );

    if (payoutAccountsError) {
      console.error(
        "ADMIN PAYOUT ACCOUNTS ERROR:",
        payoutAccountsError
      );

      return NextResponse.json(
        {
          error:
            "Unable to load payout accounts.",
        },
        {
          status: 500,
        }
      );
    }
const {
  data: pendingPayoutAccounts,
  error: pendingPayoutAccountsError,
} = await supabaseAdmin
  .from("payout_accounts")
  .select(`
    id,
    user_id,
    account_type,
    account_holder_name,
    upi_id,
    bank_account_number,
    ifsc_code,
    is_verified,
    is_active,
    created_at
  `)
  .eq("is_active", true)
  .eq("is_verified", false)
  .order("created_at", {
    ascending: false,
  });

if (pendingPayoutAccountsError) {
  console.error(
    "PENDING PAYOUT ACCOUNTS ERROR:",
    pendingPayoutAccountsError
  );

  return NextResponse.json(
    {
      error:
        "Unable to load pending payout accounts.",
    },
    {
      status: 500,
    }
  );
}
const pendingAccountUserIds = [
  ...new Set(
    (pendingPayoutAccounts ?? []).map(
      (account) => account.user_id
    )
  ),
];

let pendingAccountUsers: {
  id: string;
  name: string | null;
  email: string | null;
  mobile: string | null;
}[] = [];

if (pendingAccountUserIds.length > 0) {
  const {
    data,
    error,
  } = await supabaseAdmin
    .from("users")
    .select(`
      id,
      name,
      email,
      mobile
    `)
    .in(
      "id",
      pendingAccountUserIds
    );

  if (error) {
    console.error(
      "PENDING PAYOUT USERS ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load payout account users.",
      },
      {
        status: 500,
      }
    );
  }

  pendingAccountUsers =
    data ?? [];
}

    /* -----------------------------------------------------
       Create lookup maps
    ----------------------------------------------------- */

    const userMap =
      new Map(
        (users ?? []).map(
          (user) => [
            user.id,
            user,
          ]
        )
      );

    const payoutAccountMap =
      new Map(
        (
          payoutAccounts ?? []
        ).map(
          (account) => [
            account.user_id,
            account,
          ]
        )
      );

    /* -----------------------------------------------------
       Build response
    ----------------------------------------------------- */

    const result =
      withdrawals.map(
        (withdrawal) => {
          const student =
            userMap.get(
              withdrawal.user_id
            );

          const payoutAccount =
            payoutAccountMap.get(
              withdrawal.user_id
            );

          return {
            ...withdrawal,

            student: student
              ? {
                  id:
                    student.id,

                  name:
                    student.name,

                  email:
                    student.email,

                  mobile:
                    student.mobile,
                }
              : null,

            payout_account:
              payoutAccount ??
              null,
          };
        }
      );
const pendingUserMap =
  new Map(
    pendingAccountUsers.map(
      (user) => [
        user.id,
        user,
      ]
    )
  );

const pendingAccounts =
  (
    pendingPayoutAccounts ?? []
  ).map(
    (account) => ({
      ...account,

      student:
        pendingUserMap.get(
          account.user_id
        ) ?? null,
    })
  );
    return NextResponse.json({
  withdrawals: result,
  pendingPayoutAccounts:
    pendingAccounts,
});

  } catch (error) {
    console.error(
      "ADMIN WITHDRAWALS GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load withdrawals.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST — Admin withdrawal actions
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
    const admin =
      await getAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          error:
            "Admin access required.",
        },
        {
          status: 403,
        }
      );
    }
    const supabase =
      await createClient();
    const body =
      await request.json();

    const action =
      String(
        body.action || ""
      )
        .trim()
        .toUpperCase();

    const withdrawalId =
      String(
        body.withdrawalId ||
        ""
      ).trim();

    const payoutAccountId =
      String(
        body.payoutAccountId ||
        ""
      ).trim();

    /* -----------------------------------------------------
       Verify payout account
    ----------------------------------------------------- */

    if (
      action ===
      "VERIFY_PAYOUT_ACCOUNT"
    ) {
      if (!payoutAccountId) {
        return NextResponse.json(
          {
            error:
              "Payout account ID is required.",
          },
          {
            status: 400,
          }
        );
      }

      const {
        data,
        error,
      } =
        await supabase.rpc(
          "verify_payout_account",
          {
            p_payout_account_id:
              payoutAccountId,
          }
        );

      if (error) {
        console.error(
          "VERIFY PAYOUT ACCOUNT ERROR:",
          error
        );

        return NextResponse.json(
          {
            error:
              error.message,
          },
          {
            status: 400,
          }
        );
      }

      return NextResponse.json({
        success: true,
        data,
      });
    }

    /* -----------------------------------------------------
       Withdrawal ID required for remaining actions
    ----------------------------------------------------- */

    if (!withdrawalId) {
      return NextResponse.json(
        {
          error:
            "Withdrawal ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* -----------------------------------------------------
       Approve withdrawal
    ----------------------------------------------------- */

    if (
      action ===
      "APPROVE"
    ) {
      const {
        data,
        error,
      } =
        await supabase.rpc(
          "approve_withdrawal",
          {
            p_withdraw_request_id:
              withdrawalId,

            p_admin_user_id:
              admin.id,
          }
        );

      if (error) {
        console.error(
          "APPROVE WITHDRAWAL ERROR:",
          error
        );

        return NextResponse.json(
          {
            error:
              error.message,
          },
          {
            status: 400,
          }
        );
      }

      return NextResponse.json({
        success: true,
        data,
      });
    }

    /* -----------------------------------------------------
       Reject withdrawal
    ----------------------------------------------------- */

    if (
      action ===
      "REJECT"
    ) {
      const remarks =
        String(
          body.remarks || ""
        ).trim();

      const {
        data,
        error,
      } =
        await supabase.rpc(
          "reject_withdrawal",
          {
            p_withdraw_request_id:
              withdrawalId,

            p_admin_user_id:
              admin.id,

            p_remarks:
              remarks || null,
          }
        );

      if (error) {
        console.error(
          "REJECT WITHDRAWAL ERROR:",
          error
        );

        return NextResponse.json(
          {
            error:
              error.message,
          },
          {
            status: 400,
          }
        );
      }

      return NextResponse.json({
        success: true,
        data,
      });
    }

    /* -----------------------------------------------------
       Start manual payout
    ----------------------------------------------------- */

    if (
      action ===
      "START_PAYOUT"
    ) {
      const {
        data,
        error,
      } =
        await supabase.rpc(
          "start_manual_payout",
          {
            p_withdraw_request_id:
              withdrawalId,
          }
        );

      if (error) {
        console.error(
          "START MANUAL PAYOUT ERROR:",
          error
        );

        return NextResponse.json(
          {
            error:
              error.message,
          },
          {
            status: 400,
          }
        );
      }

      return NextResponse.json({
        success: true,
        data,
      });
    }

    /* -----------------------------------------------------
       Complete manual payout
    ----------------------------------------------------- */

    if (
      action ===
      "COMPLETE_PAYOUT"
    ) {
      const payoutReference =
        String(
          body.payoutReference ||
          ""
        ).trim();

      const payoutMethod =
        String(
          body.payoutMethod ||
          ""
        )
          .trim()
          .toUpperCase();

      if (!payoutReference) {
        return NextResponse.json(
          {
            error:
              "Payout reference is required.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        payoutMethod !== "UPI" &&
        payoutMethod !== "BANK"
      ) {
        return NextResponse.json(
          {
            error:
              "Invalid payout method.",
          },
          {
            status: 400,
          }
        );
      }

      const {
        data,
        error,
      } =
        await supabase.rpc(
          "complete_manual_payout",
          {
            p_withdraw_request_id:
              withdrawalId,

            p_payout_reference:
              payoutReference,

            p_payout_method:
              payoutMethod,
          }
        );

      if (error) {
        console.error(
          "COMPLETE MANUAL PAYOUT ERROR:",
          error
        );

        return NextResponse.json(
          {
            error:
              error.message,
          },
          {
            status: 400,
          }
        );
      }

      return NextResponse.json({
        success: true,
        data,
      });
    }

    return NextResponse.json(
      {
        error:
          "Invalid admin withdrawal action.",
      },
      {
        status: 400,
      }
    );

  } catch (error) {
    console.error(
      "ADMIN WITHDRAWAL ACTION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to process withdrawal action.",
      },
      {
        status: 500,
      }
    );
  }
}