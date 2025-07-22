import { dbClient } from '../common/provider/database';
import { Validation } from '../common/type/validation';
import {
  CreatePaymentFeeRequest,
  PaymentFeeResponse,
  toPaymentFeeResponse,
  UpdatePaymentFeeRequest,
} from '../models/paymentFeeModel';
import { PaymentFeeSchemaValidation } from '../schemas/paymentFeeSchemaValidation';
import { BadRequest } from '../exceptions/error/badRequest';

export class PaymentFeeService {
  static async create(
    admin: { id: number },
    req: CreatePaymentFeeRequest,
  ): Promise<PaymentFeeResponse> {
    const valid = Validation.validate(PaymentFeeSchemaValidation.CREATE, req);

    const period = await dbClient.academicPeriod.findUnique({
      where: { id: valid.academicPeriodId },
    });

    if (!period) throw new BadRequest('Periode akademik tidak ditemukan');
    if (!period.isActive) throw new BadRequest('Periode akademik tidak aktif');

    const duplicate = await dbClient.paymentFee.findFirst({
      where: {
        academicPeriodId: valid.academicPeriodId,
        feeType: valid.feeType,
      },
    });

    if (duplicate)
      throw new BadRequest('Biaya untuk periode dan jenis ini sudah ada');

    const fee = await dbClient.paymentFee.create({
      data: {
        ...valid,
        createdBy: admin.id,
      },
      include: {
        AcademicPeriod: true,
      },
    });

    return toPaymentFeeResponse(fee);
  }

  static async update(
    admin: { id: number },
    req: UpdatePaymentFeeRequest,
  ): Promise<PaymentFeeResponse> {
    const valid = Validation.validate(PaymentFeeSchemaValidation.UPDATE, req);

    const existing = await dbClient.paymentFee.findUnique({
      where: { id: valid.id },
    });

    if (!existing) throw new BadRequest('Biaya tidak ditemukan');
    if (existing.isInvoiced)
      throw new BadRequest('Biaya sudah diinvoiced dan tidak dapat diedit');

    if (valid.feeType && valid.feeType !== existing.feeType) {
      const conflict = await dbClient.paymentFee.findFirst({
        where: {
          academicPeriodId: existing.academicPeriodId,
          feeType: valid.feeType,
          NOT: { id: valid.id },
        },
      });
      if (conflict)
        throw new BadRequest('Jenis biaya duplikat untuk periode ini');
    }

    const updated = await dbClient.paymentFee.update({
      where: { id: valid.id },
      data: {
        ...valid,
        updatedBy: admin.id,
      },
      include: {
        AcademicPeriod: true,
      },
    });

    return toPaymentFeeResponse(updated);
  }

  static async getAll(): Promise<PaymentFeeResponse[]> {
    const data = await dbClient.paymentFee.findMany({
      include: { AcademicPeriod: true },
      orderBy: { dueDate: 'asc' },
    });

    return data.map(toPaymentFeeResponse);
  }

  static async get(id: number): Promise<PaymentFeeResponse> {
    const fee = await dbClient.paymentFee.findUnique({
      where: { id },
      include: { AcademicPeriod: true },
    });

    if (!fee) throw new BadRequest('Biaya tidak ditemukan');

    return toPaymentFeeResponse(fee);
  }

  static async delete(id: number): Promise<boolean> {
    const fee = await dbClient.paymentFee.findUnique({
      where: { id },
    });

    if (!fee) throw new BadRequest('Biaya tidak ditemukan');
    if (fee.isInvoiced)
      throw new BadRequest('Biaya yang sudah diinvoiced tidak bisa dihapus');

    await dbClient.paymentFee.delete({ where: { id } });
    return true;
  }
}
