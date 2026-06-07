import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { verifyAccessToken } from '../utils/jwt.js';

export const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    const error = new Error('Authentication token is required');
    error.statusCode = 401;
    throw error;
  }

  const payload = verifyAccessToken(token);
  const user = await User.findById(payload.sub);

  if (!user) {
    const error = new Error('Authenticated user no longer exists');
    error.statusCode = 401;
    throw error;
  }

  req.user = user;
  next();
});
