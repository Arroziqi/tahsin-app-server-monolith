import express, { Router } from 'express';
import { AcademicCalendarController } from '../../controllers/academicCalendarController';

export const academicCalendarRouter: Router = express.Router();

academicCalendarRouter.post(
  '/api/academicCalendar/create',
  AcademicCalendarController.create,
);
academicCalendarRouter.patch(
  '/api/academicCalendar/update',
  AcademicCalendarController.update,
);
academicCalendarRouter.get(
  '/api/academicCalendar/get/:id',
  AcademicCalendarController.get,
);
academicCalendarRouter.get(
  '/api/academicCalendar/getAll',
  AcademicCalendarController.getAll,
);
academicCalendarRouter.delete(
  '/api/academicCalendar/delete/:id',
  AcademicCalendarController.delete,
);
