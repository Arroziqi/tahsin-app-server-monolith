import { Teacher, TeacherStatus, User } from '@prisma/client';

export type TeacherResponse = {
  id: number;
  name: string;
  nip?: string;
  noTelp: string;
  status: TeacherStatus;
  accountNumber?: string | null;
  accountName?: string | null;
  bankName?: string | null;
  userId: number | null;
  createdBy: number | null;
  createdAt?: Date;
  User?: {
    username: string;
    email: string;
  };
};

export type CreateTeacherRequest = {
  name: string;
  nip?: string;
  noTelp: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  userId: number;
};

export type CreateUserTeacherRequest = {
  name: string;
  username: string;
  email: string;
  noTelp: string;
  password: string;
  nip?: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  userId: number;
};

export type UpdateTeacherRequest = {
  id?: number;
  name?: string;
  noTelp?: string;
  status?: TeacherStatus;
  nip?: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
};

export type UpdateTeacherStatusRequest = {
  id: number;
  status: TeacherStatus;
};

export function toTeacherResponse(
  teacher: Teacher & { User?: User },
): TeacherResponse {
  return {
    id: teacher.id,
    name: teacher.name,
    noTelp: teacher.noTelp,
    nip: teacher.nip ?? undefined,
    status: teacher.status,
    accountNumber: teacher.accountNumber,
    accountName: teacher.accountName,
    bankName: teacher.bankName,
    userId: teacher.userId,
    createdBy: teacher.createdBy,
    createdAt: teacher.createdAt ?? undefined,
    User: teacher.User
      ? {
          username: teacher.User.username,
          email: teacher.User.email,
        }
      : undefined,
  };
}
