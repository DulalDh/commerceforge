import { loginUser, registerUser } from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.validated.body);
  res.status(201).json({ success: true, data: result });
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.validated.body);
  res.json({ success: true, data: result });
});

export const getAuthStatus = (_req, res) => {
  res.json({ success: true, module: 'auth', status: 'ready' });
};
