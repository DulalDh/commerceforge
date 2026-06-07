import { Router } from 'express';
import { getAuthStatus, login, register } from '../../controllers/auth.controller.js';
import { authLimiter } from '../../middlewares/rateLimiter.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { loginSchema, registerSchema } from '../../validators/auth.validator.js';

export const authRoutes = Router();

authRoutes.get('/status', getAuthStatus);
authRoutes.post('/register', authLimiter, validateRequest(registerSchema), register);
authRoutes.post('/login', authLimiter, validateRequest(loginSchema), login);
