import { Day } from '@prisma/client';

export type DayResponse = {
  id: number;
  day: string;
  isActive?: boolean;
  createdBy: number | null;
};

export type CreateDayRequest = {
  day: string;
  isActive?: boolean;
};

export type UpdateDayRequest = {
  id: number;
  day: string;
  isActive?: boolean;
};

export function toDayResponse(day: Day): DayResponse {
  return {
    id: day.id,
    day: day.day,
    isActive: day.isActive,
    createdBy: day.createdBy,
  };
}
