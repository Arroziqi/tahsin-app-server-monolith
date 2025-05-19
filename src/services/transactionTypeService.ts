import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, TransactionType } from '@prisma/client';
import {
  CreateTransactionTypeRequest,
  toTransactionTypeResponse,
  TransactionTypeResponse,
  UpdateTransactionTypeRequest,
} from '../models/transactionTypeModel';
import { TransactionTypeSchemaValidation } from '../schemas/transactionTypeSchemaValidation';

export class TransactionTypeService {
  static async create(
    admin: Admin,
    req: CreateTransactionTypeRequest,
  ): Promise<TransactionTypeResponse> {
    const validRequest: CreateTransactionTypeRequest = Validation.validate(
      TransactionTypeSchemaValidation.CREATE,
      req,
    );

    const totalTransactionTypeWithSameTransactionType: number =
      await dbClient.transactionType.count({
        where: {
          type: validRequest.type,
        },
      });

    if (totalTransactionTypeWithSameTransactionType !== 0) {
      throw new BadRequest('duplicate transactionType');
    }

    const data = await dbClient.transactionType.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toTransactionTypeResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateTransactionTypeRequest,
  ): Promise<TransactionTypeResponse> {
    const validRequest: UpdateTransactionTypeRequest = Validation.validate(
      TransactionTypeSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.transactionType.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.transactionType.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toTransactionTypeResponse(result);
  }

  static async get(id: number): Promise<TransactionTypeResponse> {
    const data = await dbClient.transactionType.findFirst({
      where: { id },
    });
    return toTransactionTypeResponse(data!);
  }

  static async getAll(): Promise<TransactionTypeResponse[]> {
    const data: TransactionType[] = await dbClient.transactionType.findMany();

    return data.map(
      (item: TransactionType): TransactionTypeResponse =>
        toTransactionTypeResponse(item),
    );
  }
}
