import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Task } from '@prisma/client';
import { TaskSchemaValidation } from '../schemas/taskSchemaValidation';
import {
  CreateTaskRequest,
  TaskResponse,
  toTaskResponse,
  UpdateTaskRequest,
} from '../models/taskModel';

export class TaskService {
  static async create(
    admin: Admin,
    req: CreateTaskRequest,
  ): Promise<TaskResponse> {
    const validRequest: CreateTaskRequest = Validation.validate(
      TaskSchemaValidation.CREATE,
      req,
    );

    const data = await dbClient.task.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toTaskResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateTaskRequest,
  ): Promise<TaskResponse> {
    const validRequest: UpdateTaskRequest = Validation.validate(
      TaskSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.task.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.task.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toTaskResponse(result);
  }

  static async get(id: number): Promise<TaskResponse> {
    const data = await dbClient.task.findFirst({
      where: { id },
    });
    return toTaskResponse(data!);
  }

  static async getAll(): Promise<TaskResponse[]> {
    const data: Task[] = await dbClient.task.findMany();

    return data.map((item: Task): TaskResponse => toTaskResponse(item));
  }
}
