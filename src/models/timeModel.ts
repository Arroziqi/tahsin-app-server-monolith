import { Time } from '@prisma/client';
import { minutesToHHMM } from '../common/utils/time';

export type TimeResponse = {
  id: number;
  session: string;
  startTime: string;
  endTime: string;
  isActive?: boolean;
  createdBy: number | null;
};

export type CreateTimeRequest = {
  session: string;
  startTime: string;
  endTime: string;
  isActive?: boolean;
};

export type UpdateTimeRequest = {
  id?: number;
  session?: string;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
};

export function toTimeResponse(time: Time): TimeResponse {
  const startTime: string = minutesToHHMM(time.startTime);
  const endTime: string = minutesToHHMM(time.endTime);

  return {
    id: time.id,
    session: time.session,
    startTime: startTime,
    endTime: endTime,
    isActive: time.isActive,
    createdBy: time.createdBy,
  };
}
