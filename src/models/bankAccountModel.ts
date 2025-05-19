import { BankAccount } from '@prisma/client';

export type BankAccountResponse = {
  id: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
  createdBy: number | null;
};

export type CreateBankAccountRequest = {
  accountName: string;
  accountNumber: string;
  bankName: string;
};

export type UpdateBankAccountRequest = {
  id: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
};

export function toBankAccountResponse(
  bankAccount: BankAccount,
): BankAccountResponse {
  return {
    id: bankAccount.id,
    accountName: bankAccount.accountName,
    accountNumber: bankAccount.accountNumber,
    bankName: bankAccount.bankName,
    createdBy: bankAccount.createdBy,
  };
}
