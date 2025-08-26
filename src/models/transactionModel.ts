import {
  Bill,
  FeeType,
  Transaction,
  TransactionStatusEnum,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { BillResponse } from './billModel';
import { StudentResponse } from './studentModel';

export type TransactionResponse = {
  id: number;
  bankAccountId?: number | null;
  billId: number;
  studentId?: number;
  transactionType: FeeType;
  transactionStatus: TransactionStatusEnum;
  amount: number;
  createdBy: number | null;
  createdAt?: Date | null;
  Bill?: BillResponse;
  Student?: StudentResponse;
};

export type CreateTransactionRequest = {
  bankAccountId?: number | null;
  billId: number;
  studentId?: number;
  transactionType: FeeType;
  transactionStatus: TransactionStatusEnum;
  amount: number;
};

export type UpdateTransactionRequest = {
  id: number;
  studentId?: number;
  bankAccountId?: number | null;
  billId?: number;
  transactionType?: FeeType;
  transactionStatus?: TransactionStatusEnum;
  amount: number;
};

export function toTransactionResponse(
  transaction: Transaction & { Bill?: Bill; Student?: StudentResponse },
): TransactionResponse {
  return {
    id: transaction.id,
    bankAccountId: transaction.bankAccountId,
    billId: transaction.billId,
    studentId: transaction.studentId ?? undefined,
    transactionStatus: transaction.transactionStatus,
    transactionType: transaction.transactionType,
    amount: (transaction.amount as Decimal).toNumber(),
    createdBy: transaction.createdBy,
    createdAt: transaction.createdAt,
    Bill: transaction.Bill,
    Student: transaction.Student,
  };
}
