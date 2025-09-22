import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Day, Enrollment, FeeType, Schedule, Time, User } from '@prisma/client';
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
import { PaymentFeeService } from './paymentFeeService';
import { PaymentFeeResponse } from '../models/paymentFeeModel';
import { BillService } from './billService';
import { StudentResponse } from '../models/studentModel';

export class EnrollmentService {
  static async create(
    user: User,
    req: CreateEnrollmentRequest,
  ): Promise<EnrollmentResponse> {
    return dbClient.$transaction(async (tx) => {
      const validRequest: CreateEnrollmentRequest = Validation.validate(
        EnrollmentSchemaValidation.CREATE,
        req,
      );

      let userId: number;

      if (!validRequest.userId) {
        const newUser: UserResponse = await UserService.create(user, {
          ...req,
          password: DEFAULT_PW_USER,
        });
        userId = newUser.id;
      } else {
        userId = validRequest.userId;
      }

      const totalEnrollmentWithSame = await tx.enrollment.count({
        where: {
          userId: userId,
          academicPeriodId: validRequest.academicPeriodId,
        },
      });

      if (totalEnrollmentWithSame > 0) {
        throw new BadRequest('duplicate enrollment');
      }

      const { username, ...enrollmentReq } = validRequest;
      const enrollment = await tx.enrollment.create({
        data: { ...enrollmentReq, userId, createdBy: user.id },
      });

      let student: StudentResponse;

      if (validRequest.studentId) {
        student = await StudentService.update(
          user,
          {
            ...req,
            id: validRequest.studentId,
            enrollmentId: enrollment.id,
            preferredScheduleId: enrollment.timeOfStudyId,
          },
          tx,
        );
      } else {
        student = await StudentService.create(
          user,
          {
            ...req,
            userId,
            enrollmentId: enrollment.id,
            preferredScheduleId: enrollment.timeOfStudyId,
          },
          tx,
        );
      }

      const paymentFeeResponse: PaymentFeeResponse =
        await PaymentFeeService.getByAcademicPeriod(
          enrollmentReq.academicPeriodId,
          FeeType.DOWN_PAYMENT,
        );

      await BillService.create(
        user,
        {
          bill: paymentFeeResponse.amount,
          remainBill: paymentFeeResponse.amount,
          studentId: student.id,
        },
        tx,
      );

      return toEnrollmentResponse(enrollment);
    });
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
          academicPeriodId: validRequest.academicPeriodId,
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
    return dbClient.$transaction(async (tx) => {
      const validRequest: UpdateEnrollmentRequest = Validation.validate(
        EnrollmentSchemaValidation.UPDATE,
        req,
      );

      const existingData = await tx.enrollment.findUnique({
        where: { id: validRequest.id },
      });

      if (!existingData) {
        throw new BadRequest('data does not exist');
      }

      const totalEnrollmentWithSameEnrollment = await tx.enrollment.count({
        where: {
          academicPeriodId:
            validRequest.academicPeriodId ?? existingData.academicPeriodId,
          userId: validRequest.userId ?? existingData.userId,
          NOT: { id: validRequest.id },
        },
      });

      if (totalEnrollmentWithSameEnrollment > 0) {
        throw new BadRequest('duplicate enrollment');
      }

      const result = await tx.enrollment.update({
        where: { id: validRequest.id },
        data: { ...validRequest, updatedBy: user.id },
      });

      const student = await tx.student.findFirst({
        where: { enrollmentId: result.id },
      });

      if (student) {
        await StudentService.update(user, {
          ...req,
          id: student.id,
          enrollmentId: result.id,
          preferredScheduleId: result.timeOfStudyId,
        });
      }

      return toEnrollmentResponse(result);
    });
  }

  static async get(id: number): Promise<EnrollmentResponse> {
    const data = await dbClient.enrollment.findFirst({
      where: { id },
      include: {
        Schedule: {
          include: { Day: true, Time: true },
        },
      },
    });

    if (!data) {
      throw new BadRequest('Enrollment not found'); // atau error handling lain
    }

    return toEnrollmentResponse(
      data as Enrollment & {
        Schedule?: Schedule & { Day?: Day; Time?: Time };
      },
    );
  }

  static async getAll(): Promise<EnrollmentResponse[]> {
    const data: Enrollment[] = await dbClient.enrollment.findMany({
      include: {
        Schedule: {
          include: { Day: true, Time: true },
        },
      },
    });

    return data.map(
      (item: Enrollment): EnrollmentResponse => toEnrollmentResponse(item),
    );
  }
}
