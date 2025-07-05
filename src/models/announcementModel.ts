import { Announcement } from '@prisma/client';

export type AnnouncementResponse = {
  id: number;
  title: string;
  description: string;
  createdBy: number | null;
};

export type CreateAnnouncementRequest = {
  title: string;
  description: string;
};

export type UpdateAnnouncementRequest = {
  id: number;
  description: string;
  title: string;
};

export function toAnnouncementResponse(
  announcement: Announcement,
): AnnouncementResponse {
  return {
    id: announcement.id,
    title: announcement.title,
    description: announcement.description,
    createdBy: announcement.createdBy,
  };
}
