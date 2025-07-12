import express, { Router } from 'express';
import { TeacherController } from '../../controllers/teacherController';

export const teacherRouter: Router = express.Router();
teacherRouter.post('/api/teacher/create', TeacherController.create);
teacherRouter.post(
  '/api/teacher/createUserTeacher',
  TeacherController.createUserTeacher,
);
teacherRouter.patch('/api/teacher/update', TeacherController.update);
teacherRouter.patch(
  '/api/teacher/update-status',
  TeacherController.updateTeacherStatus,
);
teacherRouter.get('/api/teacher/get/:teacherId', TeacherController.get);
teacherRouter.get('/api/teacher/getAll', TeacherController.getAll);
