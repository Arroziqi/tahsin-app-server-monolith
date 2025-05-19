import { Admin } from '@prisma/client';

export type AdminResponse = {
  id: number;
  noAdmin: string;
  name: string;
  userId: number;
  createdBy: number | null;
};

export type CreateAdminRequest = {
  noAdmin: string;
  name: string;
  userId: number;
};

export type UpdateAdminRequest = {
  id: number;
  name: string;
  noAdmin: string;
};

export function toAdminResponse(admin: Admin): AdminResponse {
  return {
    id: admin.id,
    noAdmin: admin.noAdmin,
    name: admin.name,
    userId: admin.userId,
    createdBy: admin.createdBy,
  };
}
