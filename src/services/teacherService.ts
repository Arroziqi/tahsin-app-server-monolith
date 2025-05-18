import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Teacher } from '@prisma/client';
import {
  CreateTeacherRequest,
  TeacherResponse,
  toTeacherResponse,
  UpdateTeacherRequest,
} from '../models/teacherModel';
import { TeacherSchemaValidation } from '../schemas/teacherSchemaValidation';

export class TeacherService {
  static async create(
    admin: Admin,
    req: CreateTeacherRequest,
  ): Promise<TeacherResponse> {
    const validRequest: CreateTeacherRequest = Validation.validate(
      TeacherSchemaValidation.CREATE,
      req,
    );

    const totalTeacherWithSameUserId: number = await dbClient.teacher.count({
      where: {
        userId: validRequest.userId,
      },
    });

    if (totalTeacherWithSameUserId !== 0) {
      throw new BadRequest('duplicate user id');
    }

    const data = await dbClient.teacher.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toTeacherResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateTeacherRequest,
  ): Promise<TeacherResponse> {
    const validRequest: UpdateTeacherRequest = Validation.validate(
      TeacherSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.teacher.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.teacher.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toTeacherResponse(result);
  }

  static async get(id: number): Promise<TeacherResponse> {
    console.log('id nih: ', id);
    const data = await dbClient.teacher.findFirst({
      where: { id },
    });
    return toTeacherResponse(data!);
  }

  static async getAll(): Promise<TeacherResponse[]> {
    const data: Teacher[] = await dbClient.teacher.findMany();

    return data.map(
      (item: Teacher): TeacherResponse => toTeacherResponse(item),
    );
  }
}
