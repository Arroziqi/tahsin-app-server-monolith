import { Bill } from '@prisma/client';

export type BillResponse = {
  id: number;
  bill: number;
  studentId: number;
  remainBill: number;
  description?: string | null;
  createdBy: number | null;
};

export type CreateBillRequest = {
  bill: number;
  studentId: number;
  remainBill: number;
  description?: string | null;
};

export type UpdateBillRequest = {
  id: number;
  bill: number;
  studentId: number;
  remainBill: number;
  description?: string | null;
};

export function toBillResponse(bill: Bill): BillResponse {
  return {
    id: bill.id,
    bill: bill.bill,
    studentId: bill.studentId,
    remainBill: bill.remainBill,
    description: bill.description,
    createdBy: bill.createdBy,
  };
}
