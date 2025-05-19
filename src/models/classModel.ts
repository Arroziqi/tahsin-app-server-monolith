import { Class } from '@prisma/client';

export type ClassResponse = {
  id: number;
  class: string;
  classPriceId: number;
  batchId: number | null;
  createdBy: number | null;
};

export type CreateClassRequest = {
  class: string;
  classPriceId: number;
  batchId: number | null;
};

export type UpdateClassRequest = {
  id: number;
  class: string;
  classPriceId: number;
  batchId: number | null;
};

export function toClassResponse(group: Class): ClassResponse {
  return {
    id: group.id,
    class: group.class,
    classPriceId: group.classPriceId,
    batchId: group.batchId,
    createdBy: group.createdBy,
  };
}
