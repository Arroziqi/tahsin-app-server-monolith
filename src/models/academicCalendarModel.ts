import { AcademicCalendar, AcademicPeriod, Event } from '@prisma/client';

export type AcademicCalendarResponse = {
  id: number;
  academicPeriodId: number;
  eventId: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt?: Date;
  createdBy?: number;
  AcademicPeriod: {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
  };
  Event: {
    id: number;
    name: string;
    isActive?: boolean;
  };
};

export type CreateAcademicCalendarRequest = {
  academicPeriodId: number;
  eventId: number;
  startDate: Date;
  endDate: Date;
  isActive?: boolean;
};

export type UpdateAcademicCalendarRequest = {
  id: number;
  academicPeriodId?: number;
  eventId?: number;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
};

export function toAcademicCalendarResponse(
  calendar: AcademicCalendar & {
    AcademicPeriod: AcademicPeriod;
    Event: Event;
  },
): AcademicCalendarResponse {
  return {
    id: calendar.id,
    academicPeriodId: calendar.academicPeriodId,
    eventId: calendar.eventId,
    startDate: calendar.startDate,
    endDate: calendar.endDate,
    isActive: calendar.isActive,
    createdAt: calendar.createdAt || undefined,
    createdBy: calendar.createdBy || undefined,
    AcademicPeriod: {
      id: calendar.AcademicPeriod.id,
      name: calendar.AcademicPeriod.name,
      startDate: calendar.AcademicPeriod.startDate,
      endDate: calendar.AcademicPeriod.endDate,
      isActive: calendar.AcademicPeriod.isActive,
    },
    Event: {
      id: calendar.Event.id,
      name: calendar.Event.name,
      isActive: calendar.Event.isActive,
    },
  };
}
