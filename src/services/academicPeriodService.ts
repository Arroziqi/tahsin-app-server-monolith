import { Validation } from '../common/type/validation';
import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import {
  AcademicPeriodResponse,
  CreateAcademicPeriodRequest,
  toAcademicPeriodResponse,
  UpdateAcademicPeriodRequest,
} from '../models/academicPeriodModel';
import { AcademicPeriodSchemaValidation } from '../schemas/academicPeriodSchemaValidation';

export class AcademicPeriodService {
  static async create(
    admin: { id: number },
    req: CreateAcademicPeriodRequest,
  ): Promise<AcademicPeriodResponse> {
    const validRequest = Validation.validate(
      AcademicPeriodSchemaValidation.CREATE,
      req,
    );

    // Check for duplicate name
    const existingPeriod = await dbClient.academicPeriod.findFirst({
      where: { name: validRequest.name },
    });

    if (existingPeriod) {
      throw new BadRequest('Nama periode akademik sudah digunakan');
    }

    const period = await dbClient.academicPeriod.create({
      data: {
        ...validRequest,
        createdBy: admin.id,
      },
    });

    return toAcademicPeriodResponse(period);
  }

  static async update(
    admin: { id: number },
    req: UpdateAcademicPeriodRequest,
  ): Promise<AcademicPeriodResponse> {
    const validRequest = Validation.validate(
      AcademicPeriodSchemaValidation.UPDATE,
      req,
    );

    const existingPeriod = await dbClient.academicPeriod.findUnique({
      where: { id: validRequest.id },
    });

    if (!existingPeriod) {
      throw new BadRequest('Periode akademik tidak ditemukan');
    }

    // Check for duplicate name if changing
    if (validRequest.name && validRequest.name !== existingPeriod.name) {
      const duplicatePeriod = await dbClient.academicPeriod.findFirst({
        where: { name: validRequest.name },
      });

      if (duplicatePeriod) {
        throw new BadRequest('Nama periode akademik sudah digunakan');
      }
    }

    const updatedPeriod = await dbClient.academicPeriod.update({
      where: { id: validRequest.id },
      data: {
        ...validRequest,
        updatedBy: admin.id,
      },
    });

    return toAcademicPeriodResponse(updatedPeriod);
  }

  static async delete(admin: { id: number }, id: number): Promise<boolean> {
    const period = await dbClient.academicPeriod.findUnique({
      where: { id },
      include: {
        Schedules: true,
      },
    });

    if (!period) {
      throw new BadRequest('Periode akademik tidak ditemukan');
    }

    if (period.Schedules.length > 0) {
      throw new BadRequest(
        'Tidak dapat menghapus periode akademik yang sudah memiliki jadwal',
      );
    }

    await dbClient.academicPeriod.delete({
      where: { id },
    });

    return true;
  }

  static async get(id: number): Promise<AcademicPeriodResponse> {
    const period = await dbClient.academicPeriod.findUnique({
      where: { id },
    });

    if (!period) {
      throw new BadRequest('Periode akademik tidak ditemukan');
    }

    return toAcademicPeriodResponse(period);
  }

  static async getAll(): Promise<AcademicPeriodResponse[]> {
    const periods = await dbClient.academicPeriod.findMany({
      orderBy: { startDate: 'desc' },
    });

    return periods.map(toAcademicPeriodResponse);
  }
}
