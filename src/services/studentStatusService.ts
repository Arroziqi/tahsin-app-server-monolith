import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, StudentStatus } from '@prisma/client';
import {
  CreateStudentStatusRequest,
  StudentStatusResponse,
  toStudentStatusResponse,
  UpdateStudentStatusRequest,
} from '../models/studentStatusModel';
import { StudentStatusSchemaValidation } from '../schemas/studentStatusSchemaValidation';

export class StudentStatusService {
  static async create(
    admin: Admin,
    req: CreateStudentStatusRequest,
  ): Promise<StudentStatusResponse> {
    const validRequest: CreateStudentStatusRequest = Validation.validate(
      StudentStatusSchemaValidation.CREATE,
      req,
    );

    const totalStudentStatusWithSameStudentStatus: number =
      await dbClient.studentStatus.count({
        where: {
          status: validRequest.status,
        },
      });

    if (totalStudentStatusWithSameStudentStatus !== 0) {
      throw new BadRequest('duplicate studentStatus');
    }

    const data = await dbClient.studentStatus.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toStudentStatusResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateStudentStatusRequest,
  ): Promise<StudentStatusResponse> {
    const validRequest: UpdateStudentStatusRequest = Validation.validate(
      StudentStatusSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.studentStatus.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.studentStatus.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toStudentStatusResponse(result);
  }

  static async get(id: number): Promise<StudentStatusResponse> {
    const data = await dbClient.studentStatus.findFirst({
      where: { id },
    });
    return toStudentStatusResponse(data!);
  }

  static async getAll(): Promise<StudentStatusResponse[]> {
    const data: StudentStatus[] = await dbClient.studentStatus.findMany();

    return data.map(
      (item: StudentStatus): StudentStatusResponse =>
        toStudentStatusResponse(item),
    );
  }
}
