import express, { Router } from 'express';
import { AnnouncementController } from '../../controllers/announcementController';

export const announcementRouter: Router = express.Router();
announcementRouter.post(
  '/api/announcement/create',
  AnnouncementController.create,
);
announcementRouter.patch(
  '/api/announcement/update',
  AnnouncementController.update,
);
announcementRouter.get('/api/announcement/get/:id', AnnouncementController.get);
announcementRouter.get(
  '/api/announcement/getAll',
  AnnouncementController.getAll,
);
