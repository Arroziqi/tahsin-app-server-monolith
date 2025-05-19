import { Task } from '@prisma/client';

export type TaskResponse = {
  id: number;
  moduleId: number;
  teacherId: number;
  task: string;
  createdBy: number | null;
};

export type CreateTaskRequest = {
  moduleId: number;
  teacherId: number;
  task: string;
};

export type UpdateTaskRequest = {
  id: number;
  moduleId: number;
  teacherId: number;
  task: string;
};

export function toTaskResponse(task: Task): TaskResponse {
  return {
    id: task.id,
    moduleId: task.moduleId,
    teacherId: task.teacherId,
    task: task.task,
    createdBy: task.createdBy,
  };
}
