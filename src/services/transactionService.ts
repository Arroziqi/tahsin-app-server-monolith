import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Transaction, TransactionStatusEnum, User } from '@prisma/client';
import {
  CreateTransactionRequest,
  toTransactionResponse,
  TransactionResponse,
  UpdateTransactionRequest,
} from '../models/transactionModel';
import { TransactionSchemaValidation } from '../schemas/transactionSchemaValidation';
import { BillService } from './billService';
import { BillResponse } from '../models/billModel';

export class TransactionService {
  static async create(
    user: User,
    req: CreateTransactionRequest,
  ): Promise<TransactionResponse> {
    const validRequest: CreateTransactionRequest = Validation.validate(
      TransactionSchemaValidation.CREATE,
      req,
    );

    const existingBill: BillResponse = await BillService.get(
      validRequest.billId,
    );

    if (
      existingBill.remainBill < validRequest.amount &&
      validRequest.amount! < 0
    ) {
      throw new BadRequest('too much money to pay');
    }

    const data = await dbClient.transaction.create({
      data: { ...validRequest, createdBy: user.id },
    });

    if (validRequest.transactionStatus === TransactionStatusEnum.SUCCESS) {
      await BillService.update(user, {
        id: validRequest.billId,
        remainBill: existingBill.remainBill - validRequest.amount,
      });
    }

    return toTransactionResponse(data);
  }

  static async update(
    user: User,
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

    const existingBill: BillResponse = await BillService.get(
      existingData.billId,
    );

    if (
      existingBill.remainBill < validRequest.amount &&
      validRequest.amount! < 0
    ) {
      throw new BadRequest('too much money to pay');
    }

    const result = await dbClient.transaction.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: user.id },
    });

    if (validRequest.transactionStatus === TransactionStatusEnum.SUCCESS) {
      await BillService.update(user, {
        id: existingData.billId,
        remainBill: existingBill.remainBill - validRequest.amount,
      });
    }

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
