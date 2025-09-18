import { Education, Student, StudentStatusEnum, User } from '@prisma/client';

export type StudentResponse = {
  id: number;
  fullName: string;
  dateOfBirth?: Date | null;
  noTelp?: string | null;
  lastEducation?: Education | null;
  motivation: string;
  userId: number;
  username: string;
  email: string;
  levelId?: number | null;
  classId?: number | null;
  enrollmentId: number;
  studentStatus?: StudentStatusEnum | null;
  classScheduleId?: number | null;
  preferredScheduleId?: number | null;
  createdBy: number | null;
};

export type CreateStudentRequest = {
  fullName: string;
  dateOfBirth?: Date | null;
  noTelp?: string | null;
  lastEducation?: Education | null;
  motivation: string;
  userId: number;
  levelId?: number | null;
  classId?: number | null;
  enrollmentId: number;
  studentStatus?: StudentStatusEnum | null;
  preferredScheduleId?: number | null;
};

export type UpdateStudentRequest = {
  id: number;
  fullName?: string;
  dateOfBirth?: Date | null;
  noTelp?: string | null;
  lastEducation?: Education | null;
  levelId?: number | null;
  classId?: number | null;
  enrollmentId?: number;
  studentStatus?: StudentStatusEnum | null;
  classScheduleId?: number | null;
  preferredScheduleId?: number | null;
};

export function toStudentResponse(
  student: Student & { User: User },
): StudentResponse {
  return {
    id: student.id,
    fullName: student.fullName,
    dateOfBirth: student.dateOfBirth,
    noTelp: student.noTelp,
    lastEducation: student.lastEducation,
    motivation: student.motivation,
    userId: student.userId,
    username: student.User.username,
    email: student.User.email,
    levelId: student.levelId,
    classId: student.classId,
    enrollmentId: student.enrollmentId,
    studentStatus: student.studentStatus,
    classScheduleId: student.classScheduleId,
    preferredScheduleId: student.preferredScheduleId,
    createdBy: student.createdBy,
  };
}
