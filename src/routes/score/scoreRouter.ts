import express, { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { ScoreController } from '../../controllers/scoreController';

export const scoreRouter: Router = express.Router();
scoreRouter.use(adminMiddleware);
scoreRouter.post('/api/score/create', ScoreController.create);
scoreRouter.patch('/api/score/update', ScoreController.update);
scoreRouter.get('/api/score/get/:id', ScoreController.get);
scoreRouter.get('/api/score/getAll', ScoreController.getAll);
