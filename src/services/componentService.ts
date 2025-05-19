import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Component } from '@prisma/client';
import {
  ComponentResponse,
  CreateComponentRequest,
  toComponentResponse,
  UpdateComponentRequest,
} from '../models/componentModel';
import { ComponentSchemaValidation } from '../schemas/componentSchemaValidation';

export class ComponentService {
  static async create(
    admin: Admin,
    req: CreateComponentRequest,
  ): Promise<ComponentResponse> {
    const validRequest: CreateComponentRequest = Validation.validate(
      ComponentSchemaValidation.CREATE,
      req,
    );

    const totalComponentWithSameComponent: number =
      await dbClient.component.count({
        where: {
          moduleId: validRequest.moduleId,
          component: validRequest.component,
        },
      });

    if (totalComponentWithSameComponent !== 0) {
      throw new BadRequest('duplicate component');
    }

    const data = await dbClient.component.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toComponentResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateComponentRequest,
  ): Promise<ComponentResponse> {
    const validRequest: UpdateComponentRequest = Validation.validate(
      ComponentSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.component.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const mergedData = {
      moduleId: validRequest.moduleId ?? existingData.moduleId,
      component: validRequest.component ?? existingData.component,
    };

    const totalComponentWithSameComponent = await dbClient.component.count({
      where: {
        ...mergedData,
        NOT: {
          id: validRequest.id,
        },
      },
    });

    if (totalComponentWithSameComponent !== 0) {
      throw new BadRequest('duplicate component');
    }

    const result = await dbClient.component.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toComponentResponse(result);
  }

  static async get(id: number): Promise<ComponentResponse> {
    const data = await dbClient.component.findFirst({
      where: { id },
    });
    return toComponentResponse(data!);
  }

  static async getAll(): Promise<ComponentResponse[]> {
    const data: Component[] = await dbClient.component.findMany();

    return data.map(
      (item: Component): ComponentResponse => toComponentResponse(item),
    );
  }
}
