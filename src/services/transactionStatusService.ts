import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, TransactionStatus } from '@prisma/client';
import {
  CreateTransactionStatusRequest,
  toTransactionStatusResponse,
  TransactionStatusResponse,
  UpdateTransactionStatusRequest,
} from '../models/transactionStatusModel';
import { TransactionStatusSchemaValidation } from '../schemas/transactionStatusSchemaValidation';

export class TransactionStatusService {
  static async create(
    admin: Admin,
    req: CreateTransactionStatusRequest,
  ): Promise<TransactionStatusResponse> {
    const validRequest: CreateTransactionStatusRequest = Validation.validate(
      TransactionStatusSchemaValidation.CREATE,
      req,
    );

    const totalTransactionStatusWithSameTransactionStatus: number =
      await dbClient.transactionStatus.count({
        where: {
          status: validRequest.status,
        },
      });

    if (totalTransactionStatusWithSameTransactionStatus !== 0) {
      throw new BadRequest('duplicate transactionStatus');
    }

    const data = await dbClient.transactionStatus.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toTransactionStatusResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateTransactionStatusRequest,
  ): Promise<TransactionStatusResponse> {
    const validRequest: UpdateTransactionStatusRequest = Validation.validate(
      TransactionStatusSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.transactionStatus.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.transactionStatus.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toTransactionStatusResponse(result);
  }

  static async get(id: number): Promise<TransactionStatusResponse> {
    const data = await dbClient.transactionStatus.findFirst({
      where: { id },
    });
    return toTransactionStatusResponse(data!);
  }

  static async getAll(): Promise<TransactionStatusResponse[]> {
    const data: TransactionStatus[] =
      await dbClient.transactionStatus.findMany();

    return data.map(
      (item: TransactionStatus): TransactionStatusResponse =>
        toTransactionStatusResponse(item),
    );
  }
}
