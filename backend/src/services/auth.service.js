import bcrypt from 'bcryptjs';
import { ROLES } from '../constants/roles.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';

const buildAuthResponse = (user) => ({
  user,
  accessToken: signAccessToken({ sub: user.id, role: user.role }),
  refreshToken: signRefreshToken({ sub: user.id, role: user.role })
});

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError('An account already exists with this email', 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: passwordHash,
    passwordHash,
    role: ROLES.CUSTOMER
  });

  return buildAuthResponse(user);
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password +passwordHash');

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password || user.passwordHash);

  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  return buildAuthResponse(user);
};
