import { LevelResponse } from './levelModel';
import { ScheduleResponse } from './scheduleModel';
import { TeacherResponse } from './teacherModel';
import {
  ClassSchedule,
  ClassScheduleStatus,
  Level,
  Schedule,
  Teacher,
} from '@prisma/client';

export type ClassScheduleResponse = {
  id: number;
  name: string;
  levelId: number;
  scheduleId: number;
  startDate: Date;
  endDate: Date;
  teacherId: number;
  capacity?: number | null;
  isActive: boolean;
  status?: ClassScheduleStatus;
  createdAt?: Date | null;

  Level?: LevelResponse | null;
  Schedule?: ScheduleResponse | null;
  Teacher?: TeacherResponse | null;
};

export type CreateClassScheduleRequest = {
  name: string;
  levelId: number;
  scheduleId: number;
  startDate: Date;
  endDate: Date;
  teacherId: number;
  capacity?: number;
};

export type UpdateClassScheduleRequest = {
  id: number;
  name?: string;
  levelId?: number;
  scheduleId?: number;
  startDate?: Date;
  endDate?: Date;
  teacherId?: number;
  capacity?: number;
  isActive?: boolean;
  status?: ClassScheduleStatus;
};

export function toClassScheduleResponse(
  schedule: ClassSchedule & {
    Level?: Level | null;
    Schedule?: Schedule | null;
    Teacher?: Teacher | null;
  },
): ClassScheduleResponse {
  return {
    id: schedule.id,
    name: schedule.name,
    levelId: schedule.levelId,
    scheduleId: schedule.scheduleId,
    startDate: schedule.startDate,
    endDate: schedule.endDate,
    teacherId: schedule.teacherId,
    capacity: schedule.capacity,
    isActive: schedule.isActive,
    status: schedule.status,
    createdAt: schedule.createdAt,

    Level: schedule.Level,
    Schedule: schedule.Schedule,
    Teacher: schedule.Teacher,
  };
}
