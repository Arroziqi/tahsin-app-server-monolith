import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { ComponentController } from '../../controllers/componentController';

export const componentRouter: Router = express.Router();
componentRouter.use(adminMiddleware);
componentRouter.post('/api/component/create', ComponentController.create);
componentRouter.patch('/api/component/update', ComponentController.update);
componentRouter.get('/api/component/get/:id', ComponentController.get);
componentRouter.get('/api/component/getAll', ComponentController.getAll);
