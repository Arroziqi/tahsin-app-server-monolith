import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import {
  AcademicCalendarResponse,
  CreateAcademicCalendarRequest,
  toAcademicCalendarResponse,
  UpdateAcademicCalendarRequest,
} from '../models/academicCalendarModel';
import { AcademicCalendarSchemaValidation } from '../schemas/academicCalendarSchemaValidation';

export class AcademicCalendarService {
  static async create(
    admin: { id: number },
    req: CreateAcademicCalendarRequest,
  ): Promise<AcademicCalendarResponse> {
    const validRequest = Validation.validate(
      AcademicCalendarSchemaValidation.CREATE,
      req,
    );

    // Verify academic period exists
    const academicPeriod = await dbClient.academicPeriod.findUnique({
      where: { id: validRequest.academicPeriodId },
    });

    if (!academicPeriod) {
      throw new BadRequest('Periode akademik tidak ditemukan');
    }

    // Verify event exists
    const event = await dbClient.event.findUnique({
      where: { id: validRequest.eventId },
    });

    if (!event) {
      throw new BadRequest('Event tidak ditemukan');
    }

    // Verify dates are within academic period
    if (
      validRequest.startDate < academicPeriod.startDate ||
      validRequest.endDate > academicPeriod.endDate
    ) {
      throw new BadRequest('Tanggal harus dalam periode akademik');
    }

    const calendar = await dbClient.academicCalendar.create({
      data: {
        ...validRequest,
        createdBy: admin.id,
      },
    });

    return toAcademicCalendarResponse(calendar);
  }

  static async update(
    admin: { id: number },
    req: UpdateAcademicCalendarRequest,
  ): Promise<AcademicCalendarResponse> {
    const validRequest = Validation.validate(
      AcademicCalendarSchemaValidation.UPDATE,
      req,
    );

    const existingCalendar = await dbClient.academicCalendar.findUnique({
      where: { id: validRequest.id },
      include: {
        AcademicPeriod: true,
      },
    });

    if (!existingCalendar) {
      throw new BadRequest('Kalender akademik tidak ditemukan');
    }

    // Check if it's a past event
    if (existingCalendar.endDate < new Date()) {
      throw new BadRequest('Tidak dapat mengupdate event yang sudah berlalu');
    }

    // Verify academic period if changing
    let academicPeriod = existingCalendar.AcademicPeriod;
    if (validRequest.academicPeriodId) {
      const newAcademicPeriod = await dbClient.academicPeriod.findUnique({
        where: { id: validRequest.academicPeriodId },
      });

      if (!newAcademicPeriod) {
        throw new BadRequest('Periode akademik tidak ditemukan');
      }
      academicPeriod = newAcademicPeriod;
    }

    // Verify event if changing
    if (validRequest.eventId) {
      const event = await dbClient.event.findUnique({
        where: { id: validRequest.eventId },
      });

      if (!event) {
        throw new BadRequest('Event tidak ditemukan');
      }
    }

    // Verify dates are within academic period
    const startDate = validRequest.startDate || existingCalendar.startDate;
    const endDate = validRequest.endDate || existingCalendar.endDate;

    if (
      startDate < academicPeriod.startDate ||
      endDate > academicPeriod.endDate
    ) {
      throw new BadRequest('Tanggal harus dalam periode akademik');
    }

    const updatedCalendar = await dbClient.academicCalendar.update({
      where: { id: validRequest.id },
      data: {
        ...validRequest,
        updatedBy: admin.id,
      },
    });

    return toAcademicCalendarResponse(updatedCalendar);
  }

  static async delete(admin: { id: number }, id: number): Promise<boolean> {
    const calendar = await dbClient.academicCalendar.findUnique({
      where: { id },
    });

    if (!calendar) {
      throw new BadRequest('Kalender akademik tidak ditemukan');
    }

    // Check if it's a past event
    if (calendar.endDate < new Date()) {
      throw new BadRequest('Tidak dapat menghapus event yang sudah berlalu');
    }

    await dbClient.academicCalendar.delete({
      where: { id },
    });

    return true;
  }

  static async get(id: number): Promise<AcademicCalendarResponse> {
    const calendar = await dbClient.academicCalendar.findUnique({
      where: { id },
    });

    if (!calendar) {
      throw new BadRequest('Kalender akademik tidak ditemukan');
    }

    return toAcademicCalendarResponse(calendar);
  }

  static async getAll(): Promise<AcademicCalendarResponse[]> {
    const calendars = await dbClient.academicCalendar.findMany({
      orderBy: { startDate: 'asc' },
    });

    return calendars.map(toAcademicCalendarResponse);
  }
}
