import express, { Router } from 'express';
import { enrollmentRouterStudent } from './enrollment/enrollmentRouterStudent';

export const userRoleRouter: Router = express.Router();
userRoleRouter.use(enrollmentRouterStudent);
