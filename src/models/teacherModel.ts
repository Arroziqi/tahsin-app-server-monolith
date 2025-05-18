import { Teacher } from '@prisma/client';

export type TeacherResponse = {
  name: string;
  nip: number;
  accountNumber?: number | null;
  accountName?: string | null;
  bankName?: string | null;
  userId: number | null;
  createdBy: number | null;
};

export type CreateTeacherRequest = {
  name: string;
  nip: number;
  accountNumber?: number;
  accountName?: string;
  bankName?: string;
  userId: number;
};

export type UpdateTeacherRequest = {
  id: number;
  name: string;
  nip: number;
  accountNumber?: number;
  accountName?: string;
  bankName?: string;
};

export function toTeacherResponse(teacher: Teacher): TeacherResponse {
  return {
    name: teacher.name,
    nip: teacher.nip,
    accountNumber: teacher.accountNumber,
    accountName: teacher.accountName,
    bankName: teacher.bankName,
    userId: teacher.userId,
    createdBy: teacher.createdBy,
  };
}
