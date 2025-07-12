import express from 'express';
import { publicRouter } from '../routes/publicRouter';
import { errorException } from '../exceptions/errorException';
import { superRouter } from '../routes/superRouter';
import { userRoleRouter } from '../routes/userRoleRouter';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/requireRoleMiddleware';
import { Role } from '@prisma/client';
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000', // Next.js web (dev)
  'http://192.168.1.24:8081', // Expo web dev (optional)
  'exp://192.168.1.24:8081', // Expo Go (emulator/device, optional)
  'http://192.168.1.24:19000', // Kadang Expo DevTools pakai ini
];

export const web = express();
web.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser like mobile apps
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed from this origin: ' + origin));
      }
    },
    credentials: true, // ⬅️ wajib kalau pakai withCredentials
  }),
);
web.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} - Origin: ${req.headers.origin}`);
  next();
});
web.use(express.json());
web.use(publicRouter);
web.use('/admin', authMiddleware, requireRole([Role.ADMIN]), superRouter);
web.use(
  '/user',
  authMiddleware,
  requireRole([Role.STUDENT, Role.USER]),
  userRoleRouter,
);
web.use(errorException);
