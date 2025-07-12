import { BankAccount } from '@prisma/client';

export type BankAccountResponse = {
  id: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
  isActive?: boolean;
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
  isActive?: boolean;
};

export function toBankAccountResponse(
  bankAccount: BankAccount,
): BankAccountResponse {
  return {
    id: bankAccount.id,
    accountName: bankAccount.accountName,
    accountNumber: bankAccount.accountNumber,
    bankName: bankAccount.bankName,
    isActive: bankAccount.isActive,
    createdBy: bankAccount.createdBy,
  };
}
