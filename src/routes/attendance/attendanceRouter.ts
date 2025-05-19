import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { AttendanceController } from '../../controllers/attendanceController';

export const attendanceRouter: Router = express.Router();
attendanceRouter.use(adminMiddleware);
attendanceRouter.post('/api/attendance/create', AttendanceController.create);
attendanceRouter.patch('/api/attendance/update', AttendanceController.update);
attendanceRouter.get('/api/attendance/get/:id', AttendanceController.get);
attendanceRouter.get('/api/attendance/getAll', AttendanceController.getAll);
