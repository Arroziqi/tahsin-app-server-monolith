import { Level } from '@prisma/client';

export type LevelResponse = {
  id: number;
  level: string;
  isActive?: boolean;
  createdBy: number | null;
};

export type CreateLevelRequest = {
  level: string;
  isActive?: boolean;
};

export type UpdateLevelRequest = {
  id: number;
  level: string;
  isActive?: boolean;
};

export type DeleteLevelRequest = {
  id: number;
};

export function toLevelResponse(level: Level): LevelResponse {
  return {
    id: level.id,
    level: level.level,
    isActive: level.isActive,
    createdBy: level.createdBy,
  };
}
