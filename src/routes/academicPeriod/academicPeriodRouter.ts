import express, { Router } from 'express';
import { AcademicPeriodController } from '../../controllers/academicPeriodController';

export const academicPeriodRouter: Router = express.Router();
academicPeriodRouter.post(
  '/api/academicPeriod/create',
  AcademicPeriodController.create,
);
academicPeriodRouter.patch(
  '/api/academicPeriod/update',
  AcademicPeriodController.update,
);
academicPeriodRouter.get(
  '/api/academicPeriod/get/:id',
  AcademicPeriodController.get,
);
academicPeriodRouter.get(
  '/api/academicPeriod/getAll',
  AcademicPeriodController.getAll,
);
academicPeriodRouter.delete(
  '/api/academicPeriod/delete/:id',
  AcademicPeriodController.delete,
);
