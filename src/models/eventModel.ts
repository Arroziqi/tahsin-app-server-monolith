import { Event } from '@prisma/client';

export type EventResponse = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt?: Date;
  createdBy?: number;
};

export type CreateEventRequest = {
  name: string;
  isActive?: boolean;
};

export type UpdateEventRequest = {
  id: number;
  name?: string;
  isActive?: boolean;
};

export function toEventResponse(event: Event): EventResponse {
  return {
    id: event.id,
    name: event.name,
    isActive: event.isActive,
    createdAt: event.createdAt || undefined,
    createdBy: event.createdBy || undefined,
  };
}
