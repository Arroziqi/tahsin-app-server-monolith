import { Schedule } from '@prisma/client';

export type ScheduleResponse = {
  id: number;
  classId: number;
  teacherId: number;
  dayId: number;
  timeId: number;
  isActive?: boolean;

  createdBy: number | null;
};

export type CreateScheduleRequest = {
  classId: number;
  teacherId: number;
  dayId: number;
  timeId: number;
};

export type UpdateScheduleRequest = {
  id: number;
  classId: number;
  teacherId: number;
  dayId: number;
  timeId: number;
  isActive?: boolean;
};

export function toScheduleResponse(schedule: Schedule): ScheduleResponse {
  return {
    id: schedule.id,
    classId: schedule.classId,
    teacherId: schedule.teacherId,
    dayId: schedule.dayId,
    timeId: schedule.timeId,
    isActive: schedule.isActive,
    createdBy: schedule.createdBy,
  };
}
