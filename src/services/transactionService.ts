import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Transaction } from '@prisma/client';
import {
  CreateTransactionRequest,
  toTransactionResponse,
  TransactionResponse,
  UpdateTransactionRequest,
} from '../models/transactionModel';
import { TransactionSchemaValidation } from '../schemas/transactionSchemaValidation';

export class TransactionService {
  static async create(
    admin: Admin,
    req: CreateTransactionRequest,
  ): Promise<TransactionResponse> {
    const validRequest: CreateTransactionRequest = Validation.validate(
      TransactionSchemaValidation.CREATE,
      req,
    );

    const totalTransactionWithSameTransaction: number =
      await dbClient.transaction.count({
        where: {
          transactionTypeId: validRequest.transactionTypeId,
          transactionStatusId: validRequest.transactionStatusId,
          billId: validRequest.billId,
          bankAccountId: validRequest.bankAccountId,
        },
      });

    if (totalTransactionWithSameTransaction !== 0) {
      throw new BadRequest('duplicate transaction');
    }

    const data = await dbClient.transaction.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toTransactionResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateTransactionRequest,
  ): Promise<TransactionResponse> {
    const validRequest: UpdateTransactionRequest = Validation.validate(
      TransactionSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.transaction.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const mergedData = {
      transactionTypeId:
        validRequest.transactionTypeId ?? existingData.transactionTypeId,
      transactionStatusId:
        validRequest.transactionStatusId ?? existingData.transactionStatusId,
      bankAccountId: validRequest.bankAccountId ?? existingData.bankAccountId,
      billId: validRequest.billId ?? existingData.billId,
    };

    const totalTransactionWithSameTransaction =
      await dbClient.transaction.count({
        where: {
          ...mergedData,
          NOT: {
            id: validRequest.id,
          },
        },
      });

    if (totalTransactionWithSameTransaction !== 0) {
      throw new BadRequest('duplicate transaction');
    }

    const result = await dbClient.transaction.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toTransactionResponse(result);
  }

  static async get(id: number): Promise<TransactionResponse> {
    const data = await dbClient.transaction.findFirst({
      where: { id },
    });
    return toTransactionResponse(data!);
  }

  static async getAll(): Promise<TransactionResponse[]> {
    const data: Transaction[] = await dbClient.transaction.findMany();

    return data.map(
      (item: Transaction): TransactionResponse => toTransactionResponse(item),
    );
  }
}
