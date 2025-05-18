import express from 'express';
import { publicRouter } from '../routes/publicRouter';
import { router } from '../routes/router';
import { errorException } from '../exceptions/errorException';

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(router);
web.use(errorException);
