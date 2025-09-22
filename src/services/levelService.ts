import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Level, User } from '@prisma/client';
import {
  CreateLevelRequest,
  LevelResponse,
  toLevelResponse,
  UpdateLevelRequest,
} from '../models/levelModel';
import { LevelSchemaValidation } from '../schemas/levelSchemaValidation';

export class LevelService {
  static async create(
    user: User,
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

    console.log(user);

    const data = await dbClient.level.create({
      data: { ...validRequest, createdBy: user.id },
    });

    return toLevelResponse(data);
  }

  static async update(
    user: User,
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
      data: { ...validRequest, updatedBy: user.id },
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

  static async delete(id: number): Promise<string> {
    const existingData = await dbClient.level.findFirst({
      where: { id },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const isUsed = await dbClient.student.count({
      where: {
        levelId: id,
      },
    });

    if (isUsed > 0) {
      throw new BadRequest(
        'Level is used in another record and cannot be deleted',
      );
    }

    await dbClient.level.delete({
      where: { id },
    });

    return 'Level deleted successfully';
  }

  /**
   * Retrieve all levels that are assigned to at least one student
   */
  static async getAssignedLevels(): Promise<LevelResponse[]> {
    const levels: Level[] = await dbClient.level.findMany({
      where: {
        id: {
          in: (
            await dbClient.student.findMany({
              where: {
                levelId: { not: null },
              },
              distinct: ['levelId'],
              select: { levelId: true },
            })
          )
            .map((s) => s.levelId!)
            .filter((id) => id !== null),
        },
      },
      orderBy: { level: 'asc' },
    });

    return levels.map((_: Level) => toLevelResponse(_));
  }
}
