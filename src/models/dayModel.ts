import { Day } from '@prisma/client';

export type DayResponse = {
  id: number;
  day: string;
  createdBy: number | null;
};

export type CreateDayRequest = {
  day: string;
};

export type UpdateDayRequest = {
  id: number;
  day: string;
};

export function toDayResponse(day: Day): DayResponse {
  return {
    id: day.id,
    day: day.day,
    createdBy: day.createdBy,
  };
}
