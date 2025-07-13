import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Day, Schedule, Time, User } from '@prisma/client';
import {
  CreateScheduleRequest,
  ScheduleResponse,
  ScheduleWithRelation,
  toScheduleResponse,
  UpdateScheduleRequest,
} from '../models/scheduleModel';
import { ScheduleSchemaValidation } from '../schemas/scheduleSchemaValidation';

export class ScheduleService {
  private static scheduleInclude = {
    Day: true,
    Time: true,
  };

  static async create(
    user: User,
    req: CreateScheduleRequest,
  ): Promise<ScheduleResponse> {
    const validRequest: CreateScheduleRequest = Validation.validate(
      ScheduleSchemaValidation.CREATE,
      req,
    );

    const totalScheduleWithSameSchedule: number = await dbClient.schedule.count(
      {
        where: {
          dayId: validRequest.dayId,
          timeId: validRequest.timeId,
          classType: validRequest.classType,
        },
      },
    );

    if (totalScheduleWithSameSchedule !== 0) {
      throw new BadRequest('duplicate schedule');
    }

    const data = await dbClient.schedule.create({
      data: { ...validRequest, createdBy: user.id },
      include: this.scheduleInclude,
    });

    return toScheduleResponse(data as ScheduleWithRelation);
  }

  static async update(
    user: User,
    req: UpdateScheduleRequest,
  ): Promise<ScheduleResponse> {
    const validRequest: UpdateScheduleRequest = Validation.validate(
      ScheduleSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.schedule.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const mergedData = {
      dayId: validRequest.dayId ?? existingData.dayId,
      timeId: validRequest.timeId ?? existingData.timeId,
      classType: validRequest.classType ?? existingData.classType,
    };

    const totalScheduleWithSameSchedule = await dbClient.schedule.count({
      where: {
        ...mergedData,
        NOT: {
          id: validRequest.id,
        },
      },
    });

    if (totalScheduleWithSameSchedule !== 0) {
      throw new BadRequest('duplicate schedule');
    }

    const result = await dbClient.schedule.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: user.id },
      include: this.scheduleInclude,
    });

    return toScheduleResponse(result as ScheduleWithRelation);
  }

  static async get(id: number): Promise<ScheduleResponse> {
    const data = await dbClient.schedule.findFirst({
      where: { id },
      include: this.scheduleInclude,
    });

    if (!data) throw new BadRequest('Schedule not found');

    return toScheduleResponse(data as Schedule & { Day: Day; Time: Time });
  }

  static async getAll(): Promise<ScheduleResponse[]> {
    const data: ScheduleWithRelation[] = await dbClient.schedule.findMany({
      include: ScheduleService.scheduleInclude,
    });

    return data.map(toScheduleResponse);
  }

  static async delete(id: number): Promise<void> {
    const existing = await dbClient.schedule.findFirst({
      where: { id },
    });

    if (!existing) {
      throw new BadRequest('Schedule not found');
    }

    const relatedAttendance = await dbClient.attendance.findFirst({
      where: { scheduleId: id },
    });

    if (relatedAttendance) {
      throw new BadRequest('Schedule already used in attendance records');
    }

    await dbClient.schedule.delete({
      where: { id },
    });
  }
}
