import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Score } from '@prisma/client';
import {
  CreateScoreRequest,
  ScoreResponse,
  toScoreResponse,
  UpdateScoreRequest,
} from '../models/scoreModel';
import { ScoreSchemaValidation } from '../schemas/scoreSchemaValidation';

export class ScoreService {
  static async create(
    admin: Admin,
    req: CreateScoreRequest,
  ): Promise<ScoreResponse> {
    const validRequest: CreateScoreRequest = Validation.validate(
      ScoreSchemaValidation.CREATE,
      req,
    );

    const totalScoreWithSameScore: number = await dbClient.score.count({
      where: {
        studentId: validRequest.studentId,
        taskId: validRequest.taskId,
        value: validRequest.value,
      },
    });

    if (totalScoreWithSameScore !== 0) {
      throw new BadRequest('duplicate score');
    }

    const data = await dbClient.score.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toScoreResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateScoreRequest,
  ): Promise<ScoreResponse> {
    const validRequest: UpdateScoreRequest = Validation.validate(
      ScoreSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.score.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const mergedData = {
      studentId: validRequest.studentId ?? existingData.studentId,
      taskId: validRequest.taskId ?? existingData.taskId,
      value: validRequest.value ?? existingData.value,
    };

    const totalScoreWithSameScore = await dbClient.score.count({
      where: {
        ...mergedData,
        NOT: {
          id: validRequest.id,
        },
      },
    });

    if (totalScoreWithSameScore !== 0) {
      throw new BadRequest('duplicate score');
    }

    const result = await dbClient.score.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toScoreResponse(result);
  }

  static async get(id: number): Promise<ScoreResponse> {
    const data = await dbClient.score.findFirst({
      where: { id },
    });
    return toScoreResponse(data!);
  }

  static async getAll(): Promise<ScoreResponse[]> {
    const data: Score[] = await dbClient.score.findMany();

    return data.map((item: Score): ScoreResponse => toScoreResponse(item));
  }
}
