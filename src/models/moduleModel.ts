import { Module } from '@prisma/client';

export type ModuleResponse = {
  id: number;
  classId: number;
  module: string;
  createdBy: number | null;
};

export type CreateModuleRequest = {
  classId: number;
  module: string;
};

export type UpdateModuleRequest = {
  id: number;
  classId: number;
  module: string;
};

export function toModuleResponse(module: Module): ModuleResponse {
  return {
    id: module.id,
    classId: module.classId,
    module: module.module,
    createdBy: module.createdBy,
  };
}
