import express, { Router } from 'express';
import { EnrollmentController } from '../../controllers/enrollmentController';

export const enrollmentRouterStudent: Router = express.Router();
enrollmentRouterStudent.post(
  '/api/enrollment/register',
  EnrollmentController.register,
);
// enrollmentRouterStudent.patch(
//   '/api/enrollment/update',
//   EnrollmentController.update,
// );
// enrollmentRouterStudent.get(
//   '/api/enrollment/get/:id',
//   EnrollmentController.get,
// );
// enrollmentRouterStudent.get(
//   '/api/enrollment/getAll',
//   EnrollmentController.getAll,
// );
