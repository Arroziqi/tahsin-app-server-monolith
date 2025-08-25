import { FeeType, Transaction, TransactionStatusEnum } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

// TODO: change the transaction type with enum FeeType
export type TransactionResponse = {
  id: number;
  bankAccountId?: number | null;
  billId: number;
  transactionType: FeeType;
  transactionStatus: TransactionStatusEnum;
  amount: number;
  createdBy: number | null;
};

export type CreateTransactionRequest = {
  bankAccountId?: number | null;
  billId: number;
  transactionType: FeeType;
  transactionStatus: TransactionStatusEnum;
  amount: number;
};

export type UpdateTransactionRequest = {
  id: number;
  bankAccountId?: number | null;
  billId?: number;
  transactionType?: FeeType;
  transactionStatus?: TransactionStatusEnum;
  amount: number;
};

export function toTransactionResponse(
  transaction: Transaction,
): TransactionResponse {
  return {
    id: transaction.id,
    bankAccountId: transaction.bankAccountId,
    billId: transaction.billId,
    transactionStatus: transaction.transactionStatus,
    transactionType: transaction.transactionType,
    amount: (transaction.amount as Decimal).toNumber(),
    createdBy: transaction.createdBy,
  };
}
