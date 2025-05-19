import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, ClassPrice } from '@prisma/client';
import {
  ClassPriceResponse,
  CreateClassPriceRequest,
  toClassPriceResponse,
  UpdateClassPriceRequest,
} from '../models/classPriceModel';
import { ClassPriceSchemaValidation } from '../schemas/classPriceSchemaValidation';

export class ClassPriceService {
  static async create(
    admin: Admin,
    req: CreateClassPriceRequest,
  ): Promise<ClassPriceResponse> {
    const validRequest: CreateClassPriceRequest = Validation.validate(
      ClassPriceSchemaValidation.CREATE,
      req,
    );

    const totalClassPriceWithSameClassPrice: number =
      await dbClient.classPrice.count({
        where: {
          price: validRequest.price,
        },
      });

    if (totalClassPriceWithSameClassPrice !== 0) {
      throw new BadRequest('duplicate classPrice');
    }

    const data = await dbClient.classPrice.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toClassPriceResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateClassPriceRequest,
  ): Promise<ClassPriceResponse> {
    const validRequest: UpdateClassPriceRequest = Validation.validate(
      ClassPriceSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.classPrice.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.classPrice.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toClassPriceResponse(result);
  }

  static async get(id: number): Promise<ClassPriceResponse> {
    const data = await dbClient.classPrice.findFirst({
      where: { id },
    });
    return toClassPriceResponse(data!);
  }

  static async getAll(): Promise<ClassPriceResponse[]> {
    const data: ClassPrice[] = await dbClient.classPrice.findMany();

    return data.map(
      (item: ClassPrice): ClassPriceResponse => toClassPriceResponse(item),
    );
  }
}
