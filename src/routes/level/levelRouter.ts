import express, { Router } from 'express';
import { LevelController } from '../../controllers/levelController';

export const levelRouter: Router = express.Router();
levelRouter.post('/api/level/create', LevelController.create);
levelRouter.patch('/api/level/update', LevelController.update);
levelRouter.get('/api/level/get/:id', LevelController.get);
levelRouter.get('/api/level/getAll', LevelController.getAll);
