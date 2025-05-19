import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, BankAccount } from '@prisma/client';
import {
  BankAccountResponse,
  CreateBankAccountRequest,
  toBankAccountResponse,
  UpdateBankAccountRequest,
} from '../models/bankAccountModel';
import { BankAccountSchemaValidation } from '../schemas/bankAccountSchemaValidation';

export class BankAccountService {
  static async create(
    admin: Admin,
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
      data: { ...validRequest, createdBy: admin.id },
    });

    return toBankAccountResponse(data);
  }

  static async update(
    admin: Admin,
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
      data: { ...validRequest, updatedBy: admin.id },
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
}
