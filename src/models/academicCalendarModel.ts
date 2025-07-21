import { AcademicCalendar } from '@prisma/client';

export type AcademicCalendarResponse = {
  id: number;
  academicPeriodId: number;
  eventId: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt?: Date;
  createdBy?: number;
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
  calendar: AcademicCalendar,
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
  };
}
