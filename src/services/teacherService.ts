import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Teacher, User } from '@prisma/client';
import {
  CreateTeacherRequest,
  CreateUserTeacherRequest,
  TeacherResponse,
  toTeacherResponse,
  UpdateTeacherRequest,
} from '../models/teacherModel';
import { TeacherSchemaValidation } from '../schemas/teacherSchemaValidation';
import { UserService } from './userService';
import { UserResponse } from '../models/userModel';

export class TeacherService {
  static async create(
    user: User,
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
      data: { ...validRequest, createdBy: user.id },
    });

    return toTeacherResponse(data);
  }

  static async createUserTeacher(
    user: User,
    req: CreateUserTeacherRequest,
  ): Promise<TeacherResponse> {
    const validRequest: CreateUserTeacherRequest = Validation.validate(
      TeacherSchemaValidation.CREATEUSERTEACHER,
      req,
    );

    const userCreated: UserResponse = await UserService.create(user, {
      username: validRequest.username,
      email: validRequest.email,
      password: validRequest.password,
    });

    validRequest.userId = userCreated.id;

    const totalTeacherWithSameUserId: number = await dbClient.teacher.count({
      where: {
        userId: validRequest.userId,
      },
    });

    if (totalTeacherWithSameUserId !== 0) {
      throw new BadRequest('duplicate user id');
    }

    const data: Teacher = await dbClient.teacher.create({
      data: {
        name: validRequest.name,
        userId: validRequest.userId,
        noTelp: validRequest.noTelp,
        createdBy: user.id,
      },
    });

    return toTeacherResponse(data);
  }

  static async update(
    user: User,
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
      data: { ...validRequest, updatedBy: user.id },
    });

    return toTeacherResponse(result);
  }

  static async get(id: number): Promise<TeacherResponse> {
    const data = await dbClient.teacher.findFirst({
      where: { id },
    });
    return toTeacherResponse(data!);
  }

  static async getAll(): Promise<TeacherResponse[]> {
    const data: Teacher[] = await dbClient.teacher.findMany({
      include: {
        User: {
          select: {
            username: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });

    return data.map(
      (item: Teacher): TeacherResponse => toTeacherResponse(item),
    );
  }
}
