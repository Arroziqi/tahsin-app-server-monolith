import { Student } from '@prisma/client';

export type StudentResponse = {
  id: number;
  fullName: string;
  motivation: string;
  userId: number;
  levelId?: number | null;
  classId: number;
  enrollmentId: number;
  studentStatusId: number | null;
  createdBy: number | null;
};

export type CreateStudentRequest = {
  fullName: string;
  motivation: string;
  userId: number;
  levelId?: number | null;
  classId: number;
  enrollmentId: number;
  studentStatusId: number | null;
};

export type UpdateStudentRequest = {
  id: number;
  fullName: string;
  levelId?: number | null;
  classId: number;
  studentStatusId: number | null;
};

export function toStudentResponse(student: Student): StudentResponse {
  return {
    id: student.id,
    fullName: student.fullName,
    motivation: student.motivation,
    userId: student.userId,
    levelId: student.levelId,
    classId: student.classId,
    enrollmentId: student.enrollmentId,
    studentStatusId: student.studentStatusId,
    createdBy: student.createdBy,
  };
}
