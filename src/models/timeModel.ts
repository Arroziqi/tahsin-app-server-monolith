import { Time } from '@prisma/client';
import { minutesToHHMM } from '../common/utils/time';

export type TimeResponse = {
  id: number;
  startTime: string;
  endTime: string;
  createdBy: number | null;
};

export type CreateTimeRequest = {
  startTime: string;
  endTime: string;
};

export type UpdateTimeRequest = {
  id: number;
  startTime: string;
  endTime: string;
};

export function toTimeResponse(time: Time): TimeResponse {
  const startTime: string = minutesToHHMM(time.startTime);
  const endTime: string = minutesToHHMM(time.endTime);

  return {
    id: time.id,
    startTime: startTime,
    endTime: endTime,
    createdBy: time.createdBy,
  };
}
