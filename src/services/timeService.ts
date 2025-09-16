import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Time, User } from '@prisma/client';
import { TimeSchemaValidation } from '../schemas/timeSchemaValidation';
import {
  CreateTimeRequest,
  TimeResponse,
  toTimeResponse,
  UpdateTimeRequest,
} from '../models/timeModel';
import { hhmmToMinutes } from '../common/utils/time';

export class TimeService {
  private static async isOverlapping(
    startMinutes: number,
    endMinutes: number,
    excludeId?: number,
  ): Promise<boolean> {
    const conflict = await dbClient.time.findFirst({
      where: {
        NOT: excludeId ? { id: excludeId } : undefined,
        AND: [
          { startTime: { lt: endMinutes } },
          { endTime: { gt: startMinutes } },
        ],
      },
    });

    return !!conflict;
  }

  static async create(
    user: User,
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

    if (endMinutes - startMinutes !== 120) {
      throw new BadRequest('Time must be 2 hours');
    }

    if (await this.isOverlapping(startMinutes, endMinutes)) {
      throw new BadRequest('Time overlaps with existing session');
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
        session: validRequest.session,
        createdBy: user.id,
        startTime: startMinutes,
        endTime: endMinutes,
        isActive: validRequest.isActive,
      },
    });

    return toTimeResponse(data);
  }

  static async update(
    user: User,
    req: UpdateTimeRequest,
  ): Promise<TimeResponse> {
    let validRequest: UpdateTimeRequest = Validation.validate(
      TimeSchemaValidation.UPDATE,
      req,
    );

    const startMinutes = hhmmToMinutes(validRequest.startTime!);
    const endMinutes = hhmmToMinutes(validRequest.endTime!);

    if (endMinutes <= startMinutes) {
      throw new BadRequest('End time must be after start time');
    }

    if (endMinutes - startMinutes !== 120) {
      throw new BadRequest('Time must be 2 hours');
    }

    if (await this.isOverlapping(startMinutes, endMinutes, validRequest.id)) {
      throw new BadRequest('Time overlaps with existing session');
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
        session: validRequest.session,
        startTime: startMinutes,
        endTime: endMinutes,
        updatedBy: user.id,
        isActive: validRequest.isActive,
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
