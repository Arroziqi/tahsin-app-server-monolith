import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Day, User } from '@prisma/client';
import { DaySchemaValidation } from '../schemas/daySchemaValidation';
import {
  CreateDayRequest,
  DayResponse,
  toDayResponse,
  UpdateDayRequest,
} from '../models/dayModel';

export class DayService {
  static async create(user: User, req: CreateDayRequest): Promise<DayResponse> {
    const validRequest: CreateDayRequest = Validation.validate(
      DaySchemaValidation.CREATE,
      req,
    );

    const totalDayWithSameDay: number = await dbClient.day.count({
      where: {
        day: validRequest.day,
      },
    });

    if (totalDayWithSameDay !== 0) {
      throw new BadRequest('duplicate day');
    }

    const data = await dbClient.day.create({
      data: { ...validRequest, createdBy: user.id },
    });

    return toDayResponse(data);
  }

  static async update(user: User, req: UpdateDayRequest): Promise<DayResponse> {
    const validRequest: UpdateDayRequest = Validation.validate(
      DaySchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.day.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.day.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: user.id },
    });

    return toDayResponse(result);
  }

  static async get(id: number): Promise<DayResponse> {
    const data = await dbClient.day.findFirst({
      where: { id },
    });
    return toDayResponse(data!);
  }

  static async getAll(): Promise<DayResponse[]> {
    const data: Day[] = await dbClient.day.findMany();

    return data.map((item: Day): DayResponse => toDayResponse(item));
  }
}
