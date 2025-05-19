import { TransactionStatus } from '@prisma/client';

export type TransactionStatusResponse = {
  id: number;
  status: string;
  createdBy: number | null;
};

export type CreateTransactionStatusRequest = {
  status: string;
};

export type UpdateTransactionStatusRequest = {
  id: number;
  status: string;
};

export function toTransactionStatusResponse(
  transactionStatus: TransactionStatus,
): TransactionStatusResponse {
  return {
    id: transactionStatus.id,
    status: transactionStatus.status,
    createdBy: transactionStatus.createdBy,
  };
}
