import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Student, User } from '@prisma/client';
import {
  CreateStudentRequest,
  StudentResponse,
  toStudentResponse,
  UpdateStudentRequest,
} from '../models/studentModel';
import { StudentSchemaValidation } from '../schemas/studentSchemaValidation';

export class StudentService {
  static async create(
    user: User,
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
      data: { ...validRequest, createdBy: user.id },
      include: {
        User: true,
      },
    });

    return toStudentResponse(data);
  }

  static async update(
    user: User,
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
      data: { ...validRequest, updatedBy: user.id },
      include: {
        User: true,
      },
    });

    return toStudentResponse(result);
  }

  static async get(id: number): Promise<StudentResponse> {
    const data = await dbClient.student.findFirst({
      where: { id },
      include: {
        User: true,
      },
    });
    return toStudentResponse(data!);
  }

  static async getAll(): Promise<StudentResponse[]> {
    const data: (Student & { User: User })[] = await dbClient.student.findMany({
      include: {
        User: true,
      },
    });

    return data.map((item) => toStudentResponse(item));
  }
}
