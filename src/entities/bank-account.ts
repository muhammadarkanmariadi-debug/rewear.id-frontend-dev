export interface BankAccount {
  id: string;
  user_id: string;
  bank_name: string;
  account_number: string;
  account_holder_name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBankAccountRequest {
  bank_name: string;
  account_number: string;
  account_holder_name: string;
}
