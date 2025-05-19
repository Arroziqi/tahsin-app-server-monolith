import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { EnrollmentController } from '../../controllers/enrollmentController';

export const enrollmentRouter: Router = express.Router();
enrollmentRouter.use(adminMiddleware);
enrollmentRouter.post('/api/enrollment/create', EnrollmentController.create);
enrollmentRouter.patch('/api/enrollment/update', EnrollmentController.update);
enrollmentRouter.get('/api/enrollment/get/:id', EnrollmentController.get);
enrollmentRouter.get('/api/enrollment/getAll', EnrollmentController.getAll);
