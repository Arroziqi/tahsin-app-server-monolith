import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Time } from '@prisma/client';
import { TimeSchemaValidation } from '../schemas/timeSchemaValidation';
import {
  CreateTimeRequest,
  TimeResponse,
  toTimeResponse,
  UpdateTimeRequest,
} from '../models/timeModel';
import { hhmmToMinutes } from '../common/utils/time';

export class TimeService {
  static async create(
    admin: Admin,
    req: CreateTimeRequest,
  ): Promise<TimeResponse> {
    let validRequest: CreateTimeRequest = Validation.validate(
      TimeSchemaValidation.CREATE,
      req,
    );

    const startMinutes = hhmmToMinutes(validRequest.startTime);
    const endMinutes = hhmmToMinutes(validRequest.endTime);

    if (endMinutes <= startMinutes) {
      throw new BadRequest('End time must be after start time');
    }

    const totalTimeWithSameTime: number = await dbClient.time.count({
      where: {
        startTime: startMinutes,
        endTime: endMinutes,
      },
    });

    if (totalTimeWithSameTime !== 0) {
      throw new BadRequest('duplicate data');
    }

    const data = await dbClient.time.create({
      data: {
        createdBy: admin.id,
        startTime: startMinutes,
        endTime: endMinutes,
      },
    });

    return toTimeResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateTimeRequest,
  ): Promise<TimeResponse> {
    let validRequest: UpdateTimeRequest = Validation.validate(
      TimeSchemaValidation.UPDATE,
      req,
    );

    const startMinutes = hhmmToMinutes(validRequest.startTime);
    const endMinutes = hhmmToMinutes(validRequest.endTime);

    if (endMinutes <= startMinutes) {
      throw new BadRequest('End time must be after start time');
    }

    const existingData = await dbClient.time.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.time.update({
      where: {
        id: validRequest.id,
      },
      data: {
        startTime: startMinutes,
        endTime: endMinutes,
        updatedBy: admin.id,
      },
    });

    return toTimeResponse(result);
  }

  static async get(id: number): Promise<TimeResponse> {
    const data = await dbClient.time.findFirst({
      where: { id },
    });
    return toTimeResponse(data!);
  }

  static async getAll(): Promise<TimeResponse[]> {
    const data: Time[] = await dbClient.time.findMany();

    return data.map((item: Time): TimeResponse => toTimeResponse(item));
  }
}
