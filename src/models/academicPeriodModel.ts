import { AcademicPeriod } from '@prisma/client';

export type AcademicPeriodResponse = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export type CreateAcademicPeriodRequest = {
  name: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  isActive?: boolean;
};

export type UpdateAcademicPeriodRequest = {
  id: number;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  isActive?: boolean;
};

export function toAcademicPeriodResponse(
  period: AcademicPeriod,
): AcademicPeriodResponse {
  return {
    id: period.id,
    name: period.name,
    startDate: period.startDate,
    endDate: period.endDate,
    description: period.description || undefined,
    isActive: period.isActive,
    createdAt: period.createdAt || undefined,
  };
}
