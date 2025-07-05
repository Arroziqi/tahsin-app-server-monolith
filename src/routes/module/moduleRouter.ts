import express, { Router } from 'express';
import { ModuleController } from '../../controllers/moduleController';

export const moduleRouter: Router = express.Router();
moduleRouter.post('/api/module/create', ModuleController.create);
moduleRouter.patch('/api/module/update', ModuleController.update);
moduleRouter.get('/api/module/get/:id', ModuleController.get);
moduleRouter.get('/api/module/getAll', ModuleController.getAll);
