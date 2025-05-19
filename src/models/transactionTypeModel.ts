import { TransactionType } from '@prisma/client';

export type TransactionTypeResponse = {
  id: number;
  type: string;
  createdBy: number | null;
};

export type CreateTransactionTypeRequest = {
  type: string;
};

export type UpdateTransactionTypeRequest = {
  id: number;
  type: string;
};

export function toTransactionTypeResponse(
  transactionType: TransactionType,
): TransactionTypeResponse {
  return {
    id: transactionType.id,
    type: transactionType.type,
    createdBy: transactionType.createdBy,
  };
}
