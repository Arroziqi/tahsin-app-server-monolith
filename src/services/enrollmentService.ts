import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Enrollment, User } from '@prisma/client';
import {
  CreateEnrollmentRequest,
  EnrollmentResponse,
  toEnrollmentResponse,
  UpdateEnrollmentRequest,
} from '../models/enrollmentModel';
import { EnrollmentSchemaValidation } from '../schemas/enrollmentSchemaValidation';

export class EnrollmentService {
  static async create(
    admin: Admin,
    req: CreateEnrollmentRequest,
  ): Promise<EnrollmentResponse> {
    const validRequest: CreateEnrollmentRequest = Validation.validate(
      EnrollmentSchemaValidation.CREATE,
      req,
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
      data: { ...validRequest, createdBy: admin.id },
    });

    return toEnrollmentResponse(data);
  }

  static async register(
    user: User,
    req: CreateEnrollmentRequest,
  ): Promise<EnrollmentResponse> {
    const validRequest: CreateEnrollmentRequest = Validation.validate(
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
    admin: Admin,
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
      data: { ...validRequest, updatedBy: admin.id },
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
