import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Module } from '@prisma/client';
import {
  CreateModuleRequest,
  ModuleResponse,
  toModuleResponse,
  UpdateModuleRequest,
} from '../models/moduleModel';
import { ModuleSchemaValidation } from '../schemas/moduleSchemaValidation';

export class ModuleService {
  static async create(
    admin: Admin,
    req: CreateModuleRequest,
  ): Promise<ModuleResponse> {
    const validRequest: CreateModuleRequest = Validation.validate(
      ModuleSchemaValidation.CREATE,
      req,
    );

    const totalModuleWithSameModule: number = await dbClient.module.count({
      where: {
        classId: validRequest.classId,
        module: validRequest.module,
      },
    });

    if (totalModuleWithSameModule !== 0) {
      throw new BadRequest('duplicate module');
    }

    const data = await dbClient.module.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toModuleResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateModuleRequest,
  ): Promise<ModuleResponse> {
    const validRequest: UpdateModuleRequest = Validation.validate(
      ModuleSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.module.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const mergedData = {
      classId: validRequest.classId ?? existingData.classId,
      module: validRequest.module ?? existingData.module,
    };

    const totalModuleWithSameModule = await dbClient.module.count({
      where: {
        ...mergedData,
        NOT: {
          id: validRequest.id,
        },
      },
    });

    if (totalModuleWithSameModule !== 0) {
      throw new BadRequest('duplicate module');
    }

    const result = await dbClient.module.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toModuleResponse(result);
  }

  static async get(id: number): Promise<ModuleResponse> {
    const data = await dbClient.module.findFirst({
      where: { id },
    });
    return toModuleResponse(data!);
  }

  static async getAll(): Promise<ModuleResponse[]> {
    const data: Module[] = await dbClient.module.findMany();

    return data.map((item: Module): ModuleResponse => toModuleResponse(item));
  }
}
