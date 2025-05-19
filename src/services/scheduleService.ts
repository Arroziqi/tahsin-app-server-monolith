import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Schedule } from '@prisma/client';
import {
  CreateScheduleRequest,
  ScheduleResponse,
  toScheduleResponse,
  UpdateScheduleRequest,
} from '../models/scheduleModel';
import { ScheduleSchemaValidation } from '../schemas/scheduleSchemaValidation';

export class ScheduleService {
  static async create(
    admin: Admin,
    req: CreateScheduleRequest,
  ): Promise<ScheduleResponse> {
    const validRequest: CreateScheduleRequest = Validation.validate(
      ScheduleSchemaValidation.CREATE,
      req,
    );

    const totalScheduleWithSameSchedule: number = await dbClient.schedule.count(
      {
        where: {
          classId: validRequest.classId,
          teacherId: validRequest.teacherId,
          dayId: validRequest.dayId,
          timeId: validRequest.timeId,
        },
      },
    );

    if (totalScheduleWithSameSchedule !== 0) {
      throw new BadRequest('duplicate schedule');
    }

    const data = await dbClient.schedule.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toScheduleResponse(data);
  }

  static async update(
    admin: Admin,
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
      classId: validRequest.classId ?? existingData.classId,
      teacherId: validRequest.teacherId ?? existingData.teacherId,
      dayId: validRequest.dayId ?? existingData.dayId,
      timeId: validRequest.timeId ?? existingData.timeId,
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
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toScheduleResponse(result);
  }

  static async get(id: number): Promise<ScheduleResponse> {
    const data = await dbClient.schedule.findFirst({
      where: { id },
    });
    return toScheduleResponse(data!);
  }

  static async getAll(): Promise<ScheduleResponse[]> {
    const data: Schedule[] = await dbClient.schedule.findMany();

    return data.map(
      (item: Schedule): ScheduleResponse => toScheduleResponse(item),
    );
  }
}
