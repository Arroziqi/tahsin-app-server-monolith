import express, { Router } from 'express';
import { AdminController } from '../../controllers/adminController';

export const adminRouter: Router = express.Router();
adminRouter.post('/api/admin/create', AdminController.create);
adminRouter.patch('/api/admin/update', AdminController.update);
adminRouter.get('/api/admin/get/:id', AdminController.get);
adminRouter.get('/api/admin/getAll', AdminController.getAll);
