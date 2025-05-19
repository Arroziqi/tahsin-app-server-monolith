import { Batch } from '@prisma/client';

export type BatchResponse = {
  id: number;
  batch: string;
  year: number;
  createdBy: number | null;
};

export type CreateBatchRequest = {
  batch: string;
  year: number;
};

export type UpdateBatchRequest = {
  id: number;
  batch: string;
  year: number;
};

export function toBatchResponse(batch: Batch): BatchResponse {
  return {
    id: batch.id,
    batch: batch.batch,
    year: batch.year,
    createdBy: batch.createdBy,
  };
}
