import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import {
  CreateEventRequest,
  EventResponse,
  toEventResponse,
  UpdateEventRequest,
} from '../models/eventModel';
import { EventSchemaValidation } from '../schemas/eventSchemaValidation';

export class EventService {
  static async create(
    admin: { id: number },
    req: CreateEventRequest,
  ): Promise<EventResponse> {
    const validRequest = Validation.validate(EventSchemaValidation.CREATE, req);

    const existingEvent = await dbClient.event.findFirst({
      where: { name: validRequest.name },
    });

    if (existingEvent) {
      throw new BadRequest('Nama event sudah digunakan');
    }

    const event = await dbClient.event.create({
      data: {
        name: validRequest.name,
        isActive: validRequest.isActive,
        createdBy: admin.id,
      },
    });

    return toEventResponse(event);
  }

  static async update(
    admin: { id: number },
    req: UpdateEventRequest,
  ): Promise<EventResponse> {
    const validRequest = Validation.validate(EventSchemaValidation.UPDATE, req);

    const existingEvent = await dbClient.event.findUnique({
      where: { id: validRequest.id },
    });

    if (!existingEvent) {
      throw new BadRequest('Event tidak ditemukan');
    }

    if (validRequest.name && validRequest.name !== existingEvent.name) {
      const duplicateEvent = await dbClient.event.findFirst({
        where: { name: validRequest.name },
      });

      if (duplicateEvent) {
        throw new BadRequest('Nama event sudah digunakan');
      }
    }

    const updatedEvent = await dbClient.event.update({
      where: { id: validRequest.id },
      data: {
        name: validRequest.name,
        isActive: validRequest.isActive,
        updatedBy: admin.id,
      },
    });

    return toEventResponse(updatedEvent);
  }

  static async delete(admin: { id: number }, id: number): Promise<boolean> {
    const event = await dbClient.event.findUnique({
      where: { id },
      include: {
        Schedule: true,
        Transaction: true,
      },
    });

    if (!event) {
      throw new BadRequest('Event tidak ditemukan');
    }

    if (event.Schedule.length > 0 || event.Transaction.length > 0) {
      throw new BadRequest('Tidak dapat menghapus event yang sudah digunakan');
    }

    await dbClient.event.delete({
      where: { id },
    });

    return true;
  }

  static async get(id: number): Promise<EventResponse> {
    const event = await dbClient.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new BadRequest('Event tidak ditemukan');
    }

    return toEventResponse(event);
  }

  static async getAll(): Promise<EventResponse[]> {
    const events = await dbClient.event.findMany({});

    return events.map(toEventResponse);
  }
}
