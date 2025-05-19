import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Student } from '@prisma/client';
import {
  CreateStudentRequest,
  StudentResponse,
  toStudentResponse,
  UpdateStudentRequest,
} from '../models/studentModel';
import { StudentSchemaValidation } from '../schemas/studentSchemaValidation';

export class StudentService {
  static async create(
    admin: Admin,
    req: CreateStudentRequest,
  ): Promise<StudentResponse> {
    const validRequest: CreateStudentRequest = Validation.validate(
      StudentSchemaValidation.CREATE,
      req,
    );

    const totalStudentWithSameUserId: number = await dbClient.student.count({
      where: { userId: validRequest.userId },
    });

    if (totalStudentWithSameUserId !== 0) {
      throw new BadRequest('duplicate student');
    }

    const data = await dbClient.student.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toStudentResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateStudentRequest,
  ): Promise<StudentResponse> {
    const validRequest: UpdateStudentRequest = Validation.validate(
      StudentSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.student.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    const result = await dbClient.student.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toStudentResponse(result);
  }

  static async get(id: number): Promise<StudentResponse> {
    const data = await dbClient.student.findFirst({
      where: { id },
    });
    return toStudentResponse(data!);
  }

  static async getAll(): Promise<StudentResponse[]> {
    const data: Student[] = await dbClient.student.findMany();

    return data.map(
      (item: Student): StudentResponse => toStudentResponse(item),
    );
  }
}
