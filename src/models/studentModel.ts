import { Education, Student, StudentStatusEnum, User } from '@prisma/client';

export type StudentResponse = {
  id: number;
  fullName: string;
  dateOfBirth?: Date | null;
  noTelp?: string | null;
  lastEducation?: Education | null;
  motivation: string;
  userId: number;
  username: string; // baru
  email: string; // baru
  levelId?: number | null;
  classId?: number | null;
  enrollmentId: number;
  studentStatus?: StudentStatusEnum | null;
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
};

export type UpdateStudentRequest = {
  id: number;
  fullName: string;
  dateOfBirth?: Date | null;
  noTelp?: string | null;
  lastEducation?: Education | null;
  levelId?: number | null;
  classId?: number | null;
  enrollmentId?: number;
  studentStatus?: StudentStatusEnum | null;
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
    username: student.User.username, // ambil dari relasi
    email: student.User.email, // ambil dari relasi
    levelId: student.levelId,
    classId: student.classId,
    enrollmentId: student.enrollmentId,
    studentStatus: student.studentStatus,
    createdBy: student.createdBy,
  };
}
