import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { LevelController } from '../../controllers/level/levelController';

export const levelRouter: Router = express.Router();
levelRouter.use(adminMiddleware);
levelRouter.post('/api/level/create', LevelController.create);
levelRouter.patch('/api/level/update', LevelController.update);
levelRouter.get('/api/level/get/:id', LevelController.get);
levelRouter.get('/api/level/getAll', LevelController.getAll);
