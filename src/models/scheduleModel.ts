import { ClassType, Day, Schedule, Time } from '@prisma/client';
import { DayResponse } from './dayModel';
import { TimeResponse } from './timeModel';
import { minutesToHHMM } from '../common/utils/time';

export type ScheduleWithRelation = Schedule & {
  Day: Day | null;
  Time: Time | null;
};

export type ScheduleResponse = {
  id: number;
  dayId: number;
  timeId: number;
  classType: ClassType;
  isActive?: boolean;

  createdBy: number | null;
  Day?: Partial<DayResponse>;
  Time?: Partial<TimeResponse>;
};

export type ScheduleResponseShort = {
  id: number;
  day: string;
  session: string;
};

export type CreateScheduleRequest = {
  dayId: number;
  timeId: number;
  classType: ClassType;
};

export type UpdateScheduleRequest = {
  id: number;
  dayId?: number;
  timeId?: number;
  classType?: ClassType;
  isActive?: boolean;
};

export function toScheduleResponse(
  schedule: ScheduleWithRelation,
): ScheduleResponse {
  const dayResponse: Partial<DayResponse> = schedule.Day
    ? {
        id: schedule.Day.id,
        day: schedule.Day.day,
        isActive: schedule.Day.isActive,
      }
    : {};

  const timeResponse: Partial<TimeResponse> = schedule.Time
    ? {
        id: schedule.Time.id,
        session: schedule.Time.session,
        startTime: minutesToHHMM(schedule.Time.startTime),
        endTime: minutesToHHMM(schedule.Time.endTime),
        isActive: schedule.Time.isActive,
      }
    : {};

  return {
    id: schedule.id,
    dayId: schedule.dayId,
    timeId: schedule.timeId,
    classType: schedule.classType,
    isActive: schedule.isActive,
    createdBy: schedule.createdBy,
    Day: dayResponse,
    Time: timeResponse,
  };
}
