import express, { Router } from 'express';
import { EventController } from '../../controllers/eventController';

export const eventRouter: Router = express.Router();
eventRouter.post('/api/event/create', EventController.create);
eventRouter.patch('/api/event/update', EventController.update);
eventRouter.get('/api/event/get/:id', EventController.get);
eventRouter.get('/api/event/getAll', EventController.getAll);
eventRouter.delete('/api/event/delete/:id', EventController.delete);
