import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

interface SetupRequest {
  payoutAccountId?: string;
}

interface RazorpayContactResponse {
  id: string;
  entity: string;
  name: string;
  email?: string;
  contact?: string;
  type?: string;
}

interface RazorpayFundAccountResponse {
  id: string;
  entity: string;
  contact_id: string;
  account_type: string;
  bank_account?: {
    ifsc: string;
    bank_name?: string;
    name: string;
    account_number: string;
  };
  vpa?: {
    address: string;
  };
}

export async function POST(
  request: Request
) {
  try {
    /*
     * --------------------------------------------------
     * 1. VERIFY ADMIN SESSION
     * --------------------------------------------------
     */

    const supabase =
      await createClient();

    const {
      data: authData,
      error: authError,
    } =
      await supabase.auth.getUser();

    if (
      authError ||
      !authData.user
    ) {
      return NextResponse.json(
        {
          error:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * --------------------------------------------------
     * 2. VERIFY ADMIN ROLE
     * --------------------------------------------------
     */

    const { data: adminUser, error: adminError } =
      await supabaseAdmin
        .from("users")
        .select("id, role")
        .eq(
          "id",
          authData.user.id
        )
        .maybeSingle();

    if (
      adminError ||
      !adminUser ||
      !["admin", "super_admin"].includes(
        String(adminUser.role).toLowerCase()
      )
    ) {
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

    /*
     * --------------------------------------------------
     * 3. READ REQUEST
     * --------------------------------------------------
     */

    const body =
      (await request.json()) as SetupRequest;

    const payoutAccountId =
      String(
        body.payoutAccountId ?? ""
      ).trim();

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

    /*
     * --------------------------------------------------
     * 4. LOAD PAYOUT ACCOUNT
     * --------------------------------------------------
     */

    const {
      data: account,
      error: accountError,
    } =
      await supabaseAdmin
        .from("payout_accounts")
        .select(`
          id,
          user_id,
          account_type,
          account_holder_name,
          upi_id,
          bank_account_number,
          ifsc_code,
          razorpay_contact_id,
          razorpay_fund_account_id,
          is_verified,
          is_active
        `)
        .eq(
          "id",
          payoutAccountId
        )
        .maybeSingle();

    if (accountError) {
      console.error(
        "PAYOUT ACCOUNT LOOKUP ERROR:",
        accountError
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
      return NextResponse.json(
        {
          error:
            "Payout account not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (!account.is_active) {
      return NextResponse.json(
        {
          error:
            "Payout account is inactive.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * --------------------------------------------------
     * 5. PREVENT DUPLICATE RAZORPAY FUND ACCOUNT
     * --------------------------------------------------
     */

    if (
      account.razorpay_contact_id &&
      account.razorpay_fund_account_id
    ) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Razorpay payout account is already configured.",
          razorpayContactId:
            account.razorpay_contact_id,
          razorpayFundAccountId:
            account.razorpay_fund_account_id,
        }
      );
    }

    /*
     * --------------------------------------------------
     * 6. LOAD USER PROFILE
     * --------------------------------------------------
     */

    const {
      data: userProfile,
      error: userError,
    } =
      await supabaseAdmin
        .from("users")
        .select(`
          id,
          email,
          mobile
        `)
        .eq(
          "id",
          account.user_id
        )
        .maybeSingle();

    if (userError) {
      console.error(
        "USER PROFILE ERROR:",
        userError
      );

      return NextResponse.json(
        {
          error:
            "Unable to load user profile.",
        },
        {
          status: 500,
        }
      );
    }

    if (!userProfile) {
      return NextResponse.json(
        {
          error:
            "User profile not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * --------------------------------------------------
     * 7. RAZORPAY CREDENTIALS
     * --------------------------------------------------
     */

    const keyId =
      process.env
        .RAZORPAY_KEY_ID;

    const keySecret =
      process.env
        .RAZORPAY_KEY_SECRET;

    if (
      !keyId ||
      !keySecret
    ) {
      return NextResponse.json(
        {
          error:
            "Razorpay server credentials are not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * --------------------------------------------------
     * 8. BASIC AUTH
     * --------------------------------------------------
     */

    const authorization =
      Buffer.from(
        `${keyId}:${keySecret}`
      ).toString("base64");

    /*
     * --------------------------------------------------
     * 9. CREATE RAZORPAY CONTACT
     * --------------------------------------------------
     */

    let contactId =
      account.razorpay_contact_id;

    if (!contactId) {
      const contactResponse =
        await fetch(
          "https://api.razorpay.com/v1/contacts",
          {
            method: "POST",

            headers: {
              Authorization:
                `Basic ${authorization}`,

              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name:
                account.account_holder_name,

              email:
                userProfile.email ||
                undefined,

              contact:
                userProfile.mobile ||
                undefined,

              type:
                "customer",
            }),
          }
        );

      const contactData =
        (await contactResponse.json()) as
          | RazorpayContactResponse
          | {
              error?: {
                description?: string;
              };
            };

      if (!contactResponse.ok) {
        console.error(
          "RAZORPAY CONTACT ERROR:",
          contactData
        );

        return NextResponse.json(
          {
            error:
              contactData &&
              "error" in contactData &&
              contactData.error?.description
                ? contactData.error.description
                : "Unable to create Razorpay contact.",
          },
          {
            status: 502,
          }
        );
      }

      contactId =
        (
          contactData as
            RazorpayContactResponse
        ).id;

      if (!contactId) {
        return NextResponse.json(
          {
            error:
              "Razorpay did not return a contact ID.",
          },
          {
            status: 502,
          }
        );
      }

      /*
       * Store contact ID immediately.
       */

      const {
        error: contactUpdateError,
      } =
        await supabaseAdmin
          .from("payout_accounts")
          .update({
            razorpay_contact_id:
              contactId,
            updated_at:
              new Date().toISOString(),
          })
          .eq(
            "id",
            account.id
          );

      if (contactUpdateError) {
        console.error(
          "CONTACT ID SAVE ERROR:",
          contactUpdateError
        );

        return NextResponse.json(
          {
            error:
              "Razorpay contact was created but could not be saved in TCD.",
            razorpayContactId:
              contactId,
          },
          {
            status: 500,
          }
        );
      }
    }

    /*
     * --------------------------------------------------
     * 10. CREATE FUND ACCOUNT
     * --------------------------------------------------
     */

    let fundAccountId =
      account.razorpay_fund_account_id;

    if (!fundAccountId) {
      let fundBody:
        | Record<string, unknown>;

      if (
        account.account_type ===
        "UPI"
      ) {
        if (!account.upi_id) {
          return NextResponse.json(
            {
              error:
                "UPI ID is missing from payout account.",
            },
            {
              status: 400,
            }
          );
        }

        fundBody = {
          contact_id:
            contactId,

          account_type:
            "vpa",

          vpa: {
            address:
              account.upi_id,
          },
        };
      } else {
        if (
          !account.bank_account_number ||
          !account.ifsc_code
        ) {
          return NextResponse.json(
            {
              error:
                "Bank account details are incomplete.",
            },
            {
              status: 400,
            }
          );
        }

        fundBody = {
          contact_id:
            contactId,

          account_type:
            "bank_account",

          bank_account: {
            name:
              account.account_holder_name,

            ifsc:
              account.ifsc_code,

            account_number:
              account.bank_account_number,
          },
        };
      }

      const fundResponse =
        await fetch(
          "https://api.razorpay.com/v1/fund_accounts",
          {
            method: "POST",

            headers: {
              Authorization:
                `Basic ${authorization}`,

              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              fundBody
            ),
          }
        );

      const fundData =
        (await fundResponse.json()) as
          | RazorpayFundAccountResponse
          | {
              error?: {
                description?: string;
              };
            };

      if (!fundResponse.ok) {
        console.error(
          "RAZORPAY FUND ACCOUNT ERROR:",
          fundData
        );

        return NextResponse.json(
          {
            error:
              fundData &&
              "error" in fundData &&
              fundData.error?.description
                ? fundData.error.description
                : "Unable to create Razorpay fund account.",
          },
          {
            status: 502,
          }
        );
      }

      fundAccountId =
        (
          fundData as
            RazorpayFundAccountResponse
        ).id;

      if (!fundAccountId) {
        return NextResponse.json(
          {
            error:
              "Razorpay did not return a fund account ID.",
          },
          {
            status: 502,
          }
        );
      }

      /*
       * Store fund account ID.
       */

      const {
        error: fundUpdateError,
      } =
        await supabaseAdmin
          .from("payout_accounts")
          .update({
            razorpay_contact_id:
              contactId,

            razorpay_fund_account_id:
              fundAccountId,

            updated_at:
              new Date().toISOString(),
          })
          .eq(
            "id",
            account.id
          );

      if (fundUpdateError) {
        console.error(
          "FUND ACCOUNT SAVE ERROR:",
          fundUpdateError
        );

        return NextResponse.json(
          {
            error:
              "Razorpay fund account was created but could not be saved in TCD.",
            razorpayContactId:
              contactId,
            razorpayFundAccountId:
              fundAccountId,
          },
          {
            status: 500,
          }
        );
      }
    }

    /*
     * --------------------------------------------------
     * 11. DO NOT MARK VERIFIED AUTOMATICALLY
     * --------------------------------------------------
     *
     * Creation of the Razorpay contact/fund account
     * does NOT mean TCD has verified the payout account.
     *
     * Verification remains a separate step.
     */

    return NextResponse.json({
      success: true,

      message:
        "Razorpay payout account configured successfully. Verification is still required.",

      razorpayContactId:
        contactId,

      razorpayFundAccountId:
        fundAccountId,

      isVerified:
        false,
    });
  } catch (error) {
    console.error(
      "RAZORPAY PAYOUT ACCOUNT SETUP ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to configure Razorpay payout account.",
      },
      {
        status: 500,
      }
    );
  }
}