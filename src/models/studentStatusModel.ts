import { StudentStatus } from '@prisma/client';

export type StudentStatusResponse = {
  id: number;
  status: string;
  createdBy: number | null;
};

export type CreateStudentStatusRequest = {
  status: string;
};

export type UpdateStudentStatusRequest = {
  id: number;
  status: string;
};

export function toStudentStatusResponse(
  studentStatus: StudentStatus,
): StudentStatusResponse {
  return {
    id: studentStatus.id,
    status: studentStatus.status,
    createdBy: studentStatus.createdBy,
  };
}
