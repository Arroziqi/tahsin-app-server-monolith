import { Enrollment } from '@prisma/client';

export type EnrollmentResponse = {
  id: number;
  userId: number;
  classId: number;
  createdBy: number | null;
};

export type CreateEnrollmentRequest = {
  userId: number;
  classId: number;
};

export type UpdateEnrollmentRequest = {
  id: number;
  userId: number;
  classId: number;
};

export function toEnrollmentResponse(
  enrollment: Enrollment,
): EnrollmentResponse {
  return {
    id: enrollment.id,
    userId: enrollment.userId,
    classId: enrollment.classId,
    createdBy: enrollment.createdBy,
  };
}
