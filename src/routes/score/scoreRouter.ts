import express, { Router } from 'express';
import { ScoreController } from '../../controllers/scoreController';

export const scoreRouter: Router = express.Router();
scoreRouter.post('/api/score/create', ScoreController.create);
scoreRouter.patch('/api/score/update', ScoreController.update);
scoreRouter.get('/api/score/get/:id', ScoreController.get);
scoreRouter.get('/api/score/getAll', ScoreController.getAll);
