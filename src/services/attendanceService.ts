import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Attendance } from '@prisma/client';
import {
  AttendanceResponse,
  CreateAttendanceRequest,
  toAttendanceResponse,
  UpdateAttendanceRequest,
} from '../models/attendanceModel';
import { AttendanceSchemaValidation } from '../schemas/attendanceSchemaValidation';

export class AttendanceService {
  static async create(
    admin: Admin,
    req: CreateAttendanceRequest,
  ): Promise<AttendanceResponse> {
    const validRequest: CreateAttendanceRequest = Validation.validate(
      AttendanceSchemaValidation.CREATE,
      req,
    );

    const totalAttendanceWithSameAttendance: number =
      await dbClient.attendance.count({
        where: {
          studentId: validRequest.studentId,
          scheduleId: validRequest.scheduleId,
        },
      });

    if (totalAttendanceWithSameAttendance !== 0) {
      throw new BadRequest('duplicate attendance');
    }

    const data = await dbClient.attendance.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toAttendanceResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateAttendanceRequest,
  ): Promise<AttendanceResponse> {
    const validRequest: UpdateAttendanceRequest = Validation.validate(
      AttendanceSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.attendance.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const mergedData = {
      studentId: validRequest.studentId ?? existingData.studentId,
      scheduleId: validRequest.scheduleId ?? existingData.scheduleId,
    };

    const totalAttendanceWithSameAttendance = await dbClient.attendance.count({
      where: {
        ...mergedData,
        NOT: {
          id: validRequest.id,
        },
      },
    });

    if (totalAttendanceWithSameAttendance !== 0) {
      throw new BadRequest('duplicate attendance');
    }

    const result = await dbClient.attendance.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toAttendanceResponse(result);
  }

  static async get(id: number): Promise<AttendanceResponse> {
    const data = await dbClient.attendance.findFirst({
      where: { id },
    });
    return toAttendanceResponse(data!);
  }

  static async getAll(): Promise<AttendanceResponse[]> {
    const data: Attendance[] = await dbClient.attendance.findMany();

    return data.map(
      (item: Attendance): AttendanceResponse => toAttendanceResponse(item),
    );
  }
}
