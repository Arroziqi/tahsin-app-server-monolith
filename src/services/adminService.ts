import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin } from '@prisma/client';
import {
  AdminResponse,
  CreateAdminRequest,
  toAdminResponse,
  UpdateAdminRequest,
} from '../models/adminModel';
import { AdminSchemaValidation } from '../schemas/adminSchemaValidation';

export class AdminService {
  static async create(
    admin: Admin,
    req: CreateAdminRequest,
  ): Promise<AdminResponse> {
    const validRequest: CreateAdminRequest = Validation.validate(
      AdminSchemaValidation.CREATE,
      req,
    );

    const totalAdminWithSameUserId: number = await dbClient.admin.count({
      where: { userId: validRequest.userId },
    });

    if (totalAdminWithSameUserId !== 0) {
      throw new BadRequest('duplicate admin');
    }

    const data = await dbClient.admin.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toAdminResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateAdminRequest,
  ): Promise<AdminResponse> {
    const validRequest: UpdateAdminRequest = Validation.validate(
      AdminSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.admin.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    const result = await dbClient.admin.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toAdminResponse(result);
  }

  static async get(id: number): Promise<AdminResponse> {
    const data = await dbClient.admin.findFirst({
      where: { id },
    });
    return toAdminResponse(data!);
  }

  static async getAll(): Promise<AdminResponse[]> {
    const data: Admin[] = await dbClient.admin.findMany();

    return data.map((item: Admin): AdminResponse => toAdminResponse(item));
  }
}
