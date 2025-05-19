import { Teacher } from '@prisma/client';

export type TeacherResponse = {
  id: number;
  name: string;
  nip: string;
  accountNumber?: string | null;
  accountName?: string | null;
  bankName?: string | null;
  userId: number | null;
  createdBy: number | null;
};

export type CreateTeacherRequest = {
  name: string;
  nip: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  userId: number;
};

export type UpdateTeacherRequest = {
  id: number;
  name: string;
  nip: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
};

export function toTeacherResponse(teacher: Teacher): TeacherResponse {
  return {
    id: teacher.id,
    name: teacher.name,
    nip: teacher.nip,
    accountNumber: teacher.accountNumber,
    accountName: teacher.accountName,
    bankName: teacher.bankName,
    userId: teacher.userId,
    createdBy: teacher.createdBy,
  };
}
