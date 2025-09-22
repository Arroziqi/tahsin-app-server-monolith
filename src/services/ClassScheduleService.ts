import { dbClient } from '../common/provider/database';
import { BadRequest } from '../exceptions/error/badRequest';
import {
  ClassScheduleResponse,
  CreateClassScheduleRequest,
  toClassScheduleResponse,
  UpdateClassScheduleRequest,
} from '../models/classScheduleModel';
import { Validation } from '../common/type/validation';
import { ClassScheduleSchemaValidation } from '../schemas/classScheduleSchemaValidation';
import {
  ClassSchedule,
  Level,
  Schedule,
  Student,
  Teacher,
  User,
} from '@prisma/client';

export class ClassScheduleService {
  /**
   * CREATE
   * - Validasi request dengan schema
   * - Cek apakah data bentrok / duplikat (misal nama sama pada periode tertentu)
   * - Simpan ke database
   * - Kembalikan response
   */
  static async create(
    user: User,
    req: CreateClassScheduleRequest,
  ): Promise<ClassScheduleResponse> {
    const validRequest = Validation.validate(
      ClassScheduleSchemaValidation.CREATE,
      req,
    );

    if (
      validRequest.startDate > validRequest.endDate ||
      validRequest.startDate === validRequest.endDate
    ) {
      throw new BadRequest(
        'Tanggal mulai tidak boleh lebih besar atau sama dengan tanggal akhir',
      );
    }

    const duplicateName = await dbClient.classSchedule.count({
      where: { name: validRequest.name },
    });
    if (duplicateName)
      throw new BadRequest('Nama class schedule sudah digunakan');

    const duplicateSchedule = await dbClient.classSchedule.count({
      where: {
        scheduleId: validRequest.scheduleId,
        teacherId: validRequest.teacherId,
      },
    });

    if (duplicateSchedule) {
      throw new BadRequest(
        'Guru terkait sudah memiliki jadwal lain di waktu yang sama',
      );
    }

    const availableStudents: Student[] = await dbClient.student.findMany({
      where: {
        preferredScheduleId: validRequest.scheduleId,
        levelId: validRequest.levelId,
        classScheduleId: null,
      },
      orderBy: { id: 'asc' },
    });

    if (!availableStudents.length) {
      throw new BadRequest('Tidak ada siswa yang terdaftar di jadwal tersebut');
    }

    const result: ClassSchedule = await dbClient.$transaction(async (tx) => {
      const newClassSchedule: ClassSchedule = await tx.classSchedule.create({
        data: { ...validRequest, createdBy: user.id },
      });

      const studentUserIds: number[] = availableStudents.map(
        (_: Student) => _.userId,
      );
      await tx.student.updateMany({
        where: { userId: { in: studentUserIds } },
        data: { classScheduleId: newClassSchedule.id },
      });

      return newClassSchedule;
    });

    return toClassScheduleResponse(result);
  }

  /**
   * UPDATE
   * - Validasi input
   * - Pastikan data ada di DB
   * - Gabungkan data lama dengan perubahan baru
   * - Cek duplikat bila perlu
   * - Update record di DB
   */
  static async update(
    user: User,
    req: UpdateClassScheduleRequest,
  ): Promise<ClassScheduleResponse> {
    return dbClient.$transaction(async (tx) => {
      const validRequest = Validation.validate(
        ClassScheduleSchemaValidation.UPDATE,
        req,
      );

      const existing = await tx.classSchedule.findUnique({
        where: { id: validRequest.id },
      });

      if (!existing) {
        throw new BadRequest('data does not exist');
      }

      // 🚫 Tidak boleh update kalau kelas sudah mulai
      if (existing.startDate <= new Date()) {
        throw new BadRequest(
          'Tidak bisa mengubah class schedule yang sudah dimulai',
        );
      }

      const startDate = validRequest.startDate ?? existing.startDate;
      const endDate = validRequest.endDate ?? existing.endDate;
      if (startDate > endDate || startDate === endDate) {
        throw new BadRequest(
          'Tanggal mulai tidak boleh lebih besar atau sama dengan tanggal akhir',
        );
      }

      if (validRequest.name && validRequest.name !== existing.name) {
        const duplicateName = await tx.classSchedule.count({
          where: { name: validRequest.name, NOT: { id: validRequest.id } },
        });
        if (duplicateName) {
          throw new BadRequest('Nama class schedule sudah digunakan');
        }
      }

      if (
        (validRequest.scheduleId &&
          validRequest.scheduleId !== existing.scheduleId) ||
        (validRequest.teacherId &&
          validRequest.teacherId !== existing.teacherId)
      ) {
        const duplicateSchedule = await tx.classSchedule.count({
          where: {
            scheduleId: validRequest.scheduleId ?? existing.scheduleId,
            teacherId: validRequest.teacherId ?? existing.teacherId,
            NOT: { id: validRequest.id },
          },
        });
        if (duplicateSchedule) {
          throw new BadRequest(
            'Guru terkait sudah memiliki jadwal lain di waktu yang sama',
          );
        }
      }

      const updatedClassSchedule = await tx.classSchedule.update({
        where: { id: validRequest.id },
        data: { ...validRequest, updatedBy: user.id },
      });

      if (validRequest.scheduleId || validRequest.levelId) {
        const availableStudents: Student[] = await tx.student.findMany({
          where: {
            preferredScheduleId:
              validRequest.scheduleId ?? updatedClassSchedule.scheduleId,
            levelId: validRequest.levelId ?? updatedClassSchedule.levelId,
            classScheduleId: null,
          },
          orderBy: { id: 'asc' },
        });

        if (availableStudents.length) {
          const studentUserIds: number[] = availableStudents.map(
            (_: Student) => _.userId,
          );
          await tx.student.updateMany({
            where: { userId: { in: studentUserIds } },
            data: { classScheduleId: updatedClassSchedule.id },
          });
        }
      }

      return toClassScheduleResponse(updatedClassSchedule);
    });
  }

  /**
   * GET BY ID
   * - Ambil data detail class schedule
   * - Sertakan relasi Level, Schedule, Teacher
   */
  static async get(id: number): Promise<ClassScheduleResponse> {
    const data = await dbClient.classSchedule.findFirst({
      where: { id },
      include: {
        Level: true,
        Schedule: true,
        Teacher: true,
      },
    });

    if (!data) {
      throw new BadRequest('Class schedule not found');
    }

    return toClassScheduleResponse(
      data as ClassSchedule & {
        Level?: Level | null;
        Schedule?: Schedule | null;
        Teacher?: Teacher | null;
      },
    );
  }

  /**
   * GET ALL
   * - Ambil semua class schedule
   * - Tambahkan filter / pagination bila diperlukan
   */
  static async getAll(): Promise<ClassScheduleResponse[]> {
    const data = await dbClient.classSchedule.findMany({
      include: {
        Level: true,
        Schedule: { include: { Day: true, Time: true } },
        Teacher: true,
      },
    });

    return data.map((item) =>
      toClassScheduleResponse(
        item as ClassSchedule & {
          Level?: Level | null;
          Schedule?: Schedule | null;
          Teacher?: Teacher | null;
        },
      ),
    );
  }

  /**
   * DELETE
   * - Pastikan data ada
   * - (Opsional) validasi apakah jadwal sedang dipakai entitas lain
   * - Hapus dari database
   */
  static async delete(user: User, id: number): Promise<boolean> {
    return dbClient.$transaction(async (tx) => {
      const existing = await tx.classSchedule.findFirst({ where: { id } });
      if (!existing) throw new BadRequest('Class schedule not found');

      // 🚫 Tidak boleh hapus kalau jadwal sudah mulai
      if (existing.startDate <= new Date()) {
        throw new BadRequest(
          'Tidak bisa menghapus class schedule yang sudah dimulai',
        );
      }

      // Kosongkan classScheduleId di student yg terkait
      await tx.student.updateMany({
        where: { classScheduleId: id },
        data: { classScheduleId: null },
      });

      await tx.classSchedule.delete({ where: { id } });
      return true;
    });
  }
}
