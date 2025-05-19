import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Batch } from '@prisma/client';
import {
  BatchResponse,
  CreateBatchRequest,
  toBatchResponse,
  UpdateBatchRequest,
} from '../models/batchModel';
import { BatchSchemaValidation } from '../schemas/batchSchemaValidation';

export class BatchService {
  static async create(
    admin: Admin,
    req: CreateBatchRequest,
  ): Promise<BatchResponse> {
    const validRequest: CreateBatchRequest = Validation.validate(
      BatchSchemaValidation.CREATE,
      req,
    );

    const totalBatchWithSameBatch: number = await dbClient.batch.count({
      where: {
        batch: validRequest.batch,
        year: validRequest.year,
      },
    });

    if (totalBatchWithSameBatch !== 0) {
      throw new BadRequest('duplicate batch');
    }

    const data = await dbClient.batch.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toBatchResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateBatchRequest,
  ): Promise<BatchResponse> {
    const validRequest: UpdateBatchRequest = Validation.validate(
      BatchSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.batch.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.batch.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toBatchResponse(result);
  }

  static async get(id: number): Promise<BatchResponse> {
    const data = await dbClient.batch.findFirst({
      where: { id },
    });
    return toBatchResponse(data!);
  }

  static async getAll(): Promise<BatchResponse[]> {
    const data: Batch[] = await dbClient.batch.findMany();

    return data.map((item: Batch): BatchResponse => toBatchResponse(item));
  }
}
