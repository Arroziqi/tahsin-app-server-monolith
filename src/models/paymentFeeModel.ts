import { AcademicPeriod, FeeType, PaymentFee } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export type PaymentFeeResponse = {
  id: number;
  academicPeriodId: number;
  feeType: FeeType;
  amount: number;
  description?: string | null;
  dueDate: Date;
  isInvoiced: boolean;
  createdAt?: Date | null;
  AcademicPeriod: {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
  };
};

export type CreatePaymentFeeRequest = {
  academicPeriodId: number;
  feeType: FeeType;
  amount: number;
  description?: string;
  dueDate: Date;
};

export type UpdatePaymentFeeRequest = {
  id: number;
  academicPeriodId?: number;
  feeType?: FeeType;
  amount?: number;
  description?: string;
  dueDate?: Date;
};

export function toPaymentFeeResponse(
  fee: PaymentFee & { AcademicPeriod: AcademicPeriod },
): PaymentFeeResponse {
  return {
    id: fee.id,
    academicPeriodId: fee.academicPeriodId,
    feeType: fee.feeType,
    dueDate: fee.dueDate,
    isInvoiced: fee.isInvoiced,
    amount: (fee.amount as Decimal).toNumber(),
    createdAt: fee.createdAt,
    description: fee.description,
    AcademicPeriod: {
      id: fee.AcademicPeriod.id,
      name: fee.AcademicPeriod.name,
      startDate: fee.AcademicPeriod.startDate,
      endDate: fee.AcademicPeriod.endDate,
    },
  };
}
