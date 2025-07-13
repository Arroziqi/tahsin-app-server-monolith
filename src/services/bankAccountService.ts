import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { BankAccount, User } from '@prisma/client';
import {
  BankAccountResponse,
  CreateBankAccountRequest,
  toBankAccountResponse,
  UpdateBankAccountRequest,
} from '../models/bankAccountModel';
import { BankAccountSchemaValidation } from '../schemas/bankAccountSchemaValidation';

export class BankAccountService {
  static async create(
    user: User,
    req: CreateBankAccountRequest,
  ): Promise<BankAccountResponse> {
    const validRequest: CreateBankAccountRequest = Validation.validate(
      BankAccountSchemaValidation.CREATE,
      req,
    );

    const totalBankAccountWithSameBankAccount: number =
      await dbClient.bankAccount.count({
        where: {
          accountNumber: validRequest.accountNumber,
        },
      });

    if (totalBankAccountWithSameBankAccount !== 0) {
      throw new BadRequest('duplicate bankAccount');
    }

    const data = await dbClient.bankAccount.create({
      data: { ...validRequest, createdBy: user.id },
    });

    return toBankAccountResponse(data);
  }

  static async update(
    user: User,
    req: UpdateBankAccountRequest,
  ): Promise<BankAccountResponse> {
    const validRequest: UpdateBankAccountRequest = Validation.validate(
      BankAccountSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.bankAccount.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.bankAccount.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: user.id },
    });

    return toBankAccountResponse(result);
  }

  static async get(id: number): Promise<BankAccountResponse> {
    const data = await dbClient.bankAccount.findFirst({
      where: { id },
    });
    return toBankAccountResponse(data!);
  }

  static async getAll(): Promise<BankAccountResponse[]> {
    const data: BankAccount[] = await dbClient.bankAccount.findMany();

    return data.map(
      (item: BankAccount): BankAccountResponse => toBankAccountResponse(item),
    );
  }

  static async delete(user: User, id: number): Promise<boolean> {
    const existingData = await dbClient.bankAccount.findFirst({
      where: { id },
    });

    if (!existingData) {
      throw new BadRequest('Bank account does not exist');
    }

    const transactionCount = await dbClient.transaction.count({
      where: {
        bankAccountId: id,
      },
    });

    if (transactionCount > 0) {
      throw new BadRequest(
        'Cannot delete bank account because it has associated transactions',
      );
    }

    // Hard delete
    await dbClient.bankAccount.delete({
      where: { id },
    });

    return true;
  }
}
