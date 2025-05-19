import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { TeacherController } from '../../controllers/teacherController';

export const teacherRouter: Router = express.Router();
teacherRouter.use(adminMiddleware);
teacherRouter.post('/api/teacher/create', TeacherController.create);
teacherRouter.patch('/api/teacher/update', TeacherController.update);
teacherRouter.get('/api/teacher/get/:teacherId', TeacherController.get);
teacherRouter.get('/api/teacher/getAll', TeacherController.getAll);
