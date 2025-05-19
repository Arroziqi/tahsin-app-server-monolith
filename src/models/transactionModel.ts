import { Transaction } from '@prisma/client';

export type TransactionResponse = {
  id: number;
  bankAccountId: number;
  billId: number;
  transactionTypeId: number;
  transactionStatusId: number;
  createdBy: number | null;
};

export type CreateTransactionRequest = {
  bankAccountId: number;
  billId: number;
  transactionTypeId: number;
  transactionStatusId: number;
};

export type UpdateTransactionRequest = {
  id: number;
  bankAccountId: number;
  billId: number;
  transactionTypeId: number;
  transactionStatusId: number;
};

export function toTransactionResponse(
  transaction: Transaction,
): TransactionResponse {
  return {
    id: transaction.id,
    bankAccountId: transaction.bankAccountId,
    billId: transaction.billId,
    transactionStatusId: transaction.transactionStatusId,
    transactionTypeId: transaction.transactionTypeId,
    createdBy: transaction.createdBy,
  };
}
