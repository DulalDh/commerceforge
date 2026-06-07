import {
  addUserAddress,
  removeUserAddress,
  updateUserAddress,
  updateUserProfile
} from '../services/user.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await updateUserProfile(req.user, req.validated.body);
  res.json({ success: true, data: { user } });
});

export const addAddress = asyncHandler(async (req, res) => {
  const address = await addUserAddress(req.user, req.validated.body);
  res.status(201).json({ success: true, data: { address } });
});

export const updateAddress = asyncHandler(async (req, res) => {
  const address = await updateUserAddress(
    req.user,
    req.validated.params.addressId,
    req.validated.body
  );
  res.json({ success: true, data: { address } });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  await removeUserAddress(req.user, req.params.addressId);
  res.status(204).send();
});

export const getUserStatus = (_req, res) => {
  res.json({ success: true, module: 'users', status: 'ready' });
};
