import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import { Admin, Announcement } from '@prisma/client';
import {
  AnnouncementResponse,
  CreateAnnouncementRequest,
  toAnnouncementResponse,
  UpdateAnnouncementRequest,
} from '../models/announcementModel';
import { AnnouncementSchemaValidation } from '../schemas/announcementSchemaValidation';

export class AnnouncementService {
  static async create(
    admin: Admin,
    req: CreateAnnouncementRequest,
  ): Promise<AnnouncementResponse> {
    const validRequest: CreateAnnouncementRequest = Validation.validate(
      AnnouncementSchemaValidation.CREATE,
      req,
    );

    const data = await dbClient.announcement.create({
      data: { ...validRequest, createdBy: admin.id },
    });

    return toAnnouncementResponse(data);
  }

  static async update(
    admin: Admin,
    req: UpdateAnnouncementRequest,
  ): Promise<AnnouncementResponse> {
    const validRequest: UpdateAnnouncementRequest = Validation.validate(
      AnnouncementSchemaValidation.UPDATE,
      req,
    );

    const existingData = await dbClient.announcement.findFirst({
      where: {
        id: validRequest.id,
      },
    });

    if (!existingData) {
      throw new BadRequest('data does not exist');
    }

    const result = await dbClient.announcement.update({
      where: {
        id: validRequest.id,
      },
      data: { ...validRequest, updatedBy: admin.id },
    });

    return toAnnouncementResponse(result);
  }

  static async get(id: number): Promise<AnnouncementResponse> {
    const data = await dbClient.announcement.findFirst({
      where: { id },
    });
    return toAnnouncementResponse(data!);
  }

  static async getAll(): Promise<AnnouncementResponse[]> {
    const data: Announcement[] = await dbClient.announcement.findMany();

    return data.map(
      (item: Announcement): AnnouncementResponse =>
        toAnnouncementResponse(item),
    );
  }
}
