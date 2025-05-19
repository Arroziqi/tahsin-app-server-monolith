import { Score } from '@prisma/client';

export type ScoreResponse = {
  id: number;
  value: number;
  studentId: number;
  taskId: number;
  createdBy: number | null;
};

export type CreateScoreRequest = {
  value: number;
  studentId: number;
  taskId: number;
};

export type UpdateScoreRequest = {
  id: number;
  value: number;
  studentId: number;
  taskId: number;
};

export function toScoreResponse(score: Score): ScoreResponse {
  return {
    id: score.id,
    value: score.value,
    studentId: score.studentId,
    taskId: score.taskId,
    createdBy: score.createdBy,
  };
}
