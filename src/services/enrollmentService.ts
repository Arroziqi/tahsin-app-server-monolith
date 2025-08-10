import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Enrollment, User } from '@prisma/client';
import {
  CreateEnrollmentRequest,
  EnrollmentResponse,
  RegisterEnrollmentRequest,
  toEnrollmentResponse,
  UpdateEnrollmentRequest,
} from '../models/enrollmentModel';
import { EnrollmentSchemaValidation } from '../schemas/enrollmentSchemaValidation';
import { DEFAULT_PW_USER } from '../secret';
import { UserResponse } from '../models/userModel';
import { UserService } from './userService';
import { StudentService } from './studentService';

export class EnrollmentService {
  static async create(
    user: User,
    req: CreateEnrollmentRequest,
  ): Promise<EnrollmentResponse> {
    const validRequest: CreateEnrollmentRequest = Validation.validate(
      EnrollmentSchemaValidation.CREATE,
      req,
    );

    let userId: number;

    if (!validRequest.userId) {
      // Buat user baru
      const newUser: UserResponse = await UserService.create(user, {
        ...req,
        password: DEFAULT_PW_USER,
      });
      userId = newUser.id;
    } else {
      // Sudah ada user
      userId = validRequest.userId;
    }

    // Cek duplikat enrollment
    const totalEnrollmentWithSame = await dbClient.enrollment.count({
      where: {
        userId: userId,
        // classId: validRequest.classId!,
      },
    });

    if (totalEnrollmentWithSame > 0) {
      throw new BadRequest('duplicate enrollment');
    }

    // Buat enrollment baru
    const { username, ...enrollmentReq } = validRequest;
    const enrollment = await dbClient.enrollment.create({
      data: { ...enrollmentReq, userId, createdBy: user.id },
    });

    if (validRequest.userId) {
      // CASE: student sudah terdaftar → update student
      await dbClient.student.update({
        where: { userId },
        data: { enrollmentId: enrollment.id },
      });
    } else {
      await StudentService.create(user, {
        ...req,
        userId,
        enrollmentId: enrollment.id,
      });
    }

    return toEnrollmentResponse(enrollment);
  }

  // TODO: this function is not satisfied with the requirement
  static async register(
    user: User,
    req: CreateEnrollmentRequest,
  ): Promise<EnrollmentResponse> {
    const validRequest: RegisterEnrollmentRequest = Validation.validate(
      EnrollmentSchemaValidation.CREATE,
      { ...req, userId: user.id },
    );

    const totalEnrollmentWithSameEnrollment: number =
      await dbClient.enrollment.count({
        where: {
          userId: validRequest.userId,
          classId: validRequest.classId,
        },
      });

    if (totalEnrollmentWithSameEnrollment !== 0) {
      throw new BadRequest('duplicate enrollment');
    }

    const data = await dbClient.enrollment.create({
      data: { ...validRequest, createdBy: user.id },
    });

    return toEnrollmentResponse(data);
  }

  static async update(
    user: User,
    req: UpdateEnrollmentRequest,
  ): Promise<EnrollmentResponse> {
    const validRequest: UpdateEnrollmentRequest = Validation.validate(
      EnrollmentSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.enrollment.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const mergedData = {
      classId: validRequest.classId ?? existingData.classId,
      userId: validRequest.userId ?? existingData.userId,
    };

    const totalEnrollmentWithSameEnrollment = await dbClient.enrollment.count({
      where: {
        ...mergedData,
        NOT: {
          id: validRequest.id,
        },
      },
    });

    if (totalEnrollmentWithSameEnrollment !== 0) {
      throw new BadRequest('duplicate enrollment');
    }

    const result = await dbClient.enrollment.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: user.id },
    });

    return toEnrollmentResponse(result);
  }

  static async get(id: number): Promise<EnrollmentResponse> {
    const data = await dbClient.enrollment.findFirst({
      where: { id },
    });
    return toEnrollmentResponse(data!);
  }

  static async getAll(): Promise<EnrollmentResponse[]> {
    const data: Enrollment[] = await dbClient.enrollment.findMany();

    return data.map(
      (item: Enrollment): EnrollmentResponse => toEnrollmentResponse(item),
    );
  }
}
