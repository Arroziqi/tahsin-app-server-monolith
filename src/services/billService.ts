import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Bill, User } from '@prisma/client';
import {
  BillResponse,
  CreateBillRequest,
  toBillResponse,
  UpdateBillRequest,
} from '../models/billModel';
import { BillSchemaValidation } from '../schemas/billSchemaValidation';

export class BillService {
  static async create(
    user: User,
    req: CreateBillRequest,
  ): Promise<BillResponse> {
    const validRequest: CreateBillRequest = Validation.validate(
      BillSchemaValidation.CREATE,
      req,
    );

    const totalBillWithSameBill: number = await dbClient.bill.count({
      where: {
        studentId: validRequest.studentId,
        bill: validRequest.bill,
        remainBill: validRequest.remainBill,
        description: validRequest.description,
      },
    });

    if (totalBillWithSameBill !== 0) {
      throw new BadRequest('duplicate bill');
    }

    const data = await dbClient.bill.create({
      data: { ...validRequest, createdBy: user.id },
    });

    return toBillResponse(data);
  }

  static async update(
    user: User,
    req: UpdateBillRequest,
  ): Promise<BillResponse> {
    const validRequest: UpdateBillRequest = Validation.validate(
      BillSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.bill.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const mergedData = {
      studentId: validRequest.studentId ?? existingData.studentId,
      bill: validRequest.bill ?? existingData.bill,
      remainBill: validRequest.remainBill ?? existingData.remainBill,
      description: validRequest.description ?? existingData.description,
    };

    const totalBillWithSameBill = await dbClient.bill.count({
      where: {
        ...mergedData,
        NOT: {
          id: validRequest.id,
        },
      },
    });

    if (totalBillWithSameBill !== 0) {
      throw new BadRequest('duplicate bill');
    }

    const result = await dbClient.bill.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: user.id },
    });

    return toBillResponse(result);
  }

  static async get(id: number): Promise<BillResponse> {
    const data = await dbClient.bill.findFirst({
      where: { id },
    });
    return toBillResponse(data!);
  }

  static async getByStudentId(studentId: number): Promise<BillResponse> {
    const data = await dbClient.bill.findFirst({
      where: { studentId },
    });

    if (!data) throw new BadRequest('Bill not found');

    return toBillResponse(data!);
  }

  static async getAll(): Promise<BillResponse[]> {
    const data: Bill[] = await dbClient.bill.findMany();

    return data.map((item: Bill): BillResponse => toBillResponse(item));
  }
}
