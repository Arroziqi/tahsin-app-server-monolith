import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Class } from '@prisma/client';
import {
  ClassResponse,
  CreateClassRequest,
  toClassResponse,
  UpdateClassRequest,
} from '../models/classModel';
import { ClassSchemaValidation } from '../schemas/classSchemaValidation';

export class ClassService {
  static async create(
    admin: Admin,
    req: CreateClassRequest,
  ): Promise<ClassResponse> {
    const validRequest: CreateClassRequest = Validation.validate(
      ClassSchemaValidation.CREATE,
      req,
    );

    const totalClassWithSameClass: number = await dbClient.class.count({
      where: {
        class: validRequest.class,
        batchId: validRequest.batchId,
      },
    });

    if (totalClassWithSameClass !== 0) {
      throw new BadRequest('duplicate class');
    }

    const data = await dbClient.class.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toClassResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateClassRequest,
  ): Promise<ClassResponse> {
    const validRequest: UpdateClassRequest = Validation.validate(
      ClassSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.class.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.class.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toClassResponse(result);
  }

  static async get(id: number): Promise<ClassResponse> {
    const data = await dbClient.class.findFirst({
      where: { id },
    });
    return toClassResponse(data!);
  }

  static async getAll(): Promise<ClassResponse[]> {
    const data: Class[] = await dbClient.class.findMany();

    return data.map((item: Class): ClassResponse => toClassResponse(item));
  }
}
