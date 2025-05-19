import { Component } from '@prisma/client';

export type ComponentResponse = {
  id: number;
  moduleId: number;
  component: string;
  createdBy: number | null;
};

export type CreateComponentRequest = {
  moduleId: number;
  component: string;
};

export type UpdateComponentRequest = {
  id: number;
  moduleId: number;
  component: string;
};

export function toComponentResponse(component: Component): ComponentResponse {
  return {
    id: component.id,
    moduleId: component.moduleId,
    component: component.component,
    createdBy: component.createdBy,
  };
}
