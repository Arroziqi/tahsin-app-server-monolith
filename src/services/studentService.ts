import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Prisma, Student, User } from '@prisma/client';
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
    tx: Prisma.TransactionClient = dbClient,
  ): Promise<StudentResponse> {
    const valid = Validation.validate(StudentSchemaValidation.CREATE, req);

    const exists = await tx.student.count({
      where: { userId: valid.userId },
    });
    if (exists) throw new BadRequest('duplicate student');

    const data = await tx.student.create({
      data: { ...valid, createdBy: user.id },
      include: { User: true },
    });

    return toStudentResponse(data);
  }

  static async update(
    user: User,
    req: UpdateStudentRequest,
    tx: Prisma.TransactionClient = dbClient,
  ): Promise<StudentResponse> {
    const validRequest: UpdateStudentRequest = Validation.validate(
      StudentSchemaValidation.UPDATE,
      req,
    );

    const existing = await tx.student.findFirst({
      where: { id: validRequest.id },
    });
    if (!existing) throw new BadRequest('student not found');

    const result = await tx.student.update({
      where: { id: validRequest.id },
      data: { ...validRequest, updatedBy: user.id },
      include: { User: true },
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

  static async getByLevelAndPreferredSchedule(params: {
    levelId?: number;
    preferredScheduleId?: number;
  }): Promise<StudentResponse[]> {
    const { levelId, preferredScheduleId } = params;

    const data: (Student & { User: User })[] = await dbClient.student.findMany({
      where: {
        ...(levelId !== undefined ? { levelId } : {}),
        ...(preferredScheduleId !== undefined ? { preferredScheduleId } : {}),
      },
      include: { User: true },
    });

    return data.map(toStudentResponse);
  }
}
