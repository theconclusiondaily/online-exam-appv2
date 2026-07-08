export interface Wallet {
  user_id: string;

  available_balance: number;
  locked_balance: number;
  bonus_balance: number;
  lifetime_balance: number;

  lifetime_added: number;
  lifetime_won: number;
  lifetime_spent: number;
  lifetime_withdrawn: number;
  lifetime_refunded: number;

  currency: string;
  status: string;

  created_at: string;
  updated_at: string;
}