import { supabase } from "@/lib/supabase/client";

export interface FinanceUser {
  user_id: string;
  name: string;
  email: string;
  role: string;

  available_balance: number;
  locked_balance: number;
  bonus_balance: number;

  lifetime_added: number;
  lifetime_won: number;
  lifetime_spent: number;
  lifetime_withdrawn: number;
  lifetime_refunded: number;

  wallet_status: string;
}

export interface GetFinanceUsersOptions {
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getFinanceUsers(
  options: GetFinanceUsersOptions = {}
): Promise<FinanceUser[]> {
  const {
    search = "",
    limit = 50,
    offset = 0,
  } = options;

  const {
    data,
    error,
  } = await supabase.rpc(
    "get_finance_users",
    {
      p_search: search.trim() || null,
      p_limit: Math.min(Math.max(limit, 1), 100),
      p_offset: Math.max(offset, 0),
    }
  );

  if (error) {
    console.error(
      "GET FINANCE USERS ERROR:",
      error
    );

    throw new Error(
      error.message ||
        "Unable to load finance users."
    );
  }

  return (data ?? []).map(
    (user: FinanceUser) => ({
      ...user,

      available_balance:
        Number(user.available_balance ?? 0),

      locked_balance:
        Number(user.locked_balance ?? 0),

      bonus_balance:
        Number(user.bonus_balance ?? 0),

      lifetime_added:
        Number(user.lifetime_added ?? 0),

      lifetime_won:
        Number(user.lifetime_won ?? 0),

      lifetime_spent:
        Number(user.lifetime_spent ?? 0),

      lifetime_withdrawn:
        Number(user.lifetime_withdrawn ?? 0),

      lifetime_refunded:
        Number(user.lifetime_refunded ?? 0),
    })
  );
}