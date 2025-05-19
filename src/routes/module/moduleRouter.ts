import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { ModuleController } from '../../controllers/moduleController';

export const moduleRouter: Router = express.Router();
moduleRouter.use(adminMiddleware);
moduleRouter.post('/api/module/create', ModuleController.create);
moduleRouter.patch('/api/module/update', ModuleController.update);
moduleRouter.get('/api/module/get/:id', ModuleController.get);
moduleRouter.get('/api/module/getAll', ModuleController.getAll);
