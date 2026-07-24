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
   Helpers
========================================================= */

function maskUpiId(
  upiId: string | null
) {
  if (!upiId) return null;

  const [name, provider] =
    upiId.split("@");

  if (!provider) {
    return "••••";
  }

  const visible =
    name.slice(0, 2);

  return `${visible}••••@${provider}`;
}

function maskBankAccount(
  accountNumber: string | null
) {
  if (!accountNumber) return null;

  const lastFour =
    accountNumber.slice(-4);

  return `••••${lastFour}`;
}

/* =========================================================
   GET — Current user's active payout account
========================================================= */

export async function GET() {
  try {
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
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const {
      data: account,
      error,
    } =
      await supabaseAdmin
        .from(
          "payout_accounts"
        )
        .select(`
          id,
          account_type,
          account_holder_name,
          upi_id,
          bank_account_number,
          ifsc_code,
          is_verified,
          is_active,
          created_at
        `)
        .eq(
          "user_id",
          user.id
        )
        .eq(
          "is_active",
          true
        )
        .maybeSingle();

    if (error) {
      console.error(
        "PAYOUT ACCOUNT GET ERROR:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Unable to load payout account.",
        },
        {
          status: 500,
        }
      );
    }

    if (!account) {
      return NextResponse.json({
        account: null,
      });
    }

    /*
      Never return the complete bank account
      number or UPI ID to the browser.
    */

    return NextResponse.json({
      account: {
        id:
          account.id,

        accountType:
          account.account_type,

        accountHolderName:
          account.account_holder_name,

        upiId:
          maskUpiId(
            account.upi_id
          ),

        bankAccountNumber:
          maskBankAccount(
            account.bank_account_number
          ),

        ifscCode:
          account.ifsc_code,

        isVerified:
          account.is_verified,

        isActive:
          account.is_active,

        createdAt:
          account.created_at,
      },
    });

  } catch (error) {
    console.error(
      "PAYOUT ACCOUNT GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load payout account.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST — Create payout account
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
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
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const accountType =
      String(
        body.accountType || ""
      )
        .trim()
        .toUpperCase();

    const accountHolderName =
      String(
        body.accountHolderName ||
        ""
      ).trim();

    if (
      accountType !== "UPI" &&
      accountType !== "BANK"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid payout account type.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      accountHolderName.length <
      2
    ) {
      return NextResponse.json(
        {
          error:
            "Enter a valid account holder name.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       Build validated payout data
    ===================================================== */

    let upiId:
      string | null = null;

    let bankAccountNumber:
      string | null = null;

    let ifscCode:
      string | null = null;

    if (
      accountType === "UPI"
    ) {
      upiId =
        String(
          body.upiId || ""
        )
          .trim()
          .toLowerCase();

      const upiPattern =
        /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z]{2,64}$/;

      if (
        !upiPattern.test(
          upiId
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Enter a valid UPI ID.",
          },
          {
            status: 400,
          }
        );
      }
    }

    if (
      accountType === "BANK"
    ) {
      bankAccountNumber =
        String(
          body.bankAccountNumber ||
          ""
        )
          .replace(/\s/g, "");

      ifscCode =
        String(
          body.ifscCode || ""
        )
          .trim()
          .toUpperCase();

      if (
        !/^\d{6,18}$/.test(
          bankAccountNumber
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Enter a valid bank account number.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(
          ifscCode
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Enter a valid IFSC code.",
          },
          {
            status: 400,
          }
        );
      }
    }

    /* =====================================================
       Prevent replacement while withdrawal is active
    ===================================================== */

    const {
      data: activeWithdrawal,
      error: withdrawalError,
    } =
      await supabaseAdmin
        .from(
          "withdraw_requests"
        )
        .select("id")
        .eq(
          "user_id",
          user.id
        )
        .in(
          "status",
          [
            "PENDING",
            "APPROVED",
            "PROCESSING",
          ]
        )
        .limit(1)
        .maybeSingle();

    if (withdrawalError) {
      console.error(
        "PAYOUT ACCOUNT WITHDRAWAL CHECK ERROR:",
        withdrawalError
      );

      return NextResponse.json(
        {
          error:
            "Unable to validate payout account.",
        },
        {
          status: 500,
        }
      );
    }

    if (activeWithdrawal) {
      return NextResponse.json(
        {
          error:
            "Payout account cannot be changed while a withdrawal is active.",
        },
        {
          status: 409,
        }
      );
    }

    /* =====================================================
       Deactivate previous account
    ===================================================== */

    const {
      error: deactivateError,
    } =
      await supabaseAdmin
        .from(
          "payout_accounts"
        )
        .update({
          is_active: false,
          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "user_id",
          user.id
        )
        .eq(
          "is_active",
          true
        );

    if (deactivateError) {
      console.error(
        "PAYOUT ACCOUNT DEACTIVATE ERROR:",
        deactivateError
      );

      return NextResponse.json(
        {
          error:
            "Unable to update payout account.",
        },
        {
          status: 500,
        }
      );
    }

    /* =====================================================
       Create new account

       IMPORTANT:
       is_verified remains FALSE until
       Razorpay verification is implemented.
    ===================================================== */

    const {
      data: account,
      error: insertError,
    } =
      await supabaseAdmin
        .from(
          "payout_accounts"
        )
        .insert({
          user_id:
            user.id,

          account_type:
            accountType,

          account_holder_name:
            accountHolderName,

          upi_id:
            upiId,

          bank_account_number:
            bankAccountNumber,

          ifsc_code:
            ifscCode,

          is_verified:
            false,

          is_active:
            true,
        })
        .select(`
          id,
          account_type,
          account_holder_name,
          upi_id,
          bank_account_number,
          ifsc_code,
          is_verified,
          is_active,
          created_at
        `)
        .single();

    if (
      insertError ||
      !account
    ) {
      console.error(
        "PAYOUT ACCOUNT INSERT ERROR:",
        insertError
      );

      return NextResponse.json(
        {
          error:
            "Unable to save payout account.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        account: {
          id:
            account.id,

          accountType:
            account.account_type,

          accountHolderName:
            account.account_holder_name,

          upiId:
            maskUpiId(
              account.upi_id
            ),

          bankAccountNumber:
            maskBankAccount(
              account.bank_account_number
            ),

          ifscCode:
            account.ifsc_code,

          isVerified:
            account.is_verified,

          isActive:
            account.is_active,

          createdAt:
            account.created_at,
        },
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error(
      "PAYOUT ACCOUNT POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to save payout account.",
      },
      {
        status: 500,
      }
    );
  }
}