import express, { Router } from 'express';
import { StudentStatusController } from '../../controllers/studentStatusController';

export const studentStatusRouter: Router = express.Router();
studentStatusRouter.post(
  '/api/studentStatus/create',
  StudentStatusController.create,
);
studentStatusRouter.patch(
  '/api/studentStatus/update',
  StudentStatusController.update,
);
studentStatusRouter.get(
  '/api/studentStatus/get/:id',
  StudentStatusController.get,
);
studentStatusRouter.get(
  '/api/studentStatus/getAll',
  StudentStatusController.getAll,
);
