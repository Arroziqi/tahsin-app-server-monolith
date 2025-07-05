import express, { Router } from 'express';
import { EnrollmentController } from '../../controllers/enrollmentController';

export const enrollmentRouter: Router = express.Router();
enrollmentRouter.post('/api/enrollment/create', EnrollmentController.create);
enrollmentRouter.patch('/api/enrollment/update', EnrollmentController.update);
enrollmentRouter.get('/api/enrollment/get/:id', EnrollmentController.get);
enrollmentRouter.get('/api/enrollment/getAll', EnrollmentController.getAll);
