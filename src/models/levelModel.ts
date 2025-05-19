import { Level } from '@prisma/client';

export type LevelResponse = {
  id: number;
  level: string;
  createdBy: number | null;
};

export type CreateLevelRequest = {
  level: string;
};

export type UpdateLevelRequest = {
  id: number;
  level: string;
};

export function toLevelResponse(level: Level): LevelResponse {
  return {
    id: level.id,
    level: level.level,
    createdBy: level.createdBy,
  };
}
