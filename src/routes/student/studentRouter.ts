import express, { Router } from 'express';
import { StudentController } from '../../controllers/studentController';

export const studentRouter: Router = express.Router();
studentRouter.post('/api/student/create', StudentController.create);
studentRouter.patch('/api/student/update', StudentController.update);
studentRouter.get('/api/student/get/:id', StudentController.get);
studentRouter.get('/api/student/getAll', StudentController.getAll);
