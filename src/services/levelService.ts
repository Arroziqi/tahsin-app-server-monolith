import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Level } from '@prisma/client';
import {
  CreateLevelRequest,
  LevelResponse,
  toLevelResponse,
  UpdateLevelRequest,
} from '../models/levelModel';
import { LevelSchemaValidation } from '../schemas/levelSchemaValidation';

export class LevelService {
  static async create(
    admin: Admin,
    req: CreateLevelRequest,
  ): Promise<LevelResponse> {
    const validRequest: CreateLevelRequest = Validation.validate(
      LevelSchemaValidation.CREATE,
      req,
    );

    const totalLevelWithSameLevel: number = await dbClient.level.count({
      where: {
        level: validRequest.level,
      },
    });

    if (totalLevelWithSameLevel !== 0) {
      throw new BadRequest('duplicate level');
    }

    const data = await dbClient.level.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toLevelResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateLevelRequest,
  ): Promise<LevelResponse> {
    const validRequest: UpdateLevelRequest = Validation.validate(
      LevelSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.level.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.level.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toLevelResponse(result);
  }

  static async get(id: number): Promise<LevelResponse> {
    const data = await dbClient.level.findFirst({
      where: { id },
    });
    return toLevelResponse(data!);
  }

  static async getAll(): Promise<LevelResponse[]> {
    const data: Level[] = await dbClient.level.findMany();

    return data.map((item: Level): LevelResponse => toLevelResponse(item));
  }
}
