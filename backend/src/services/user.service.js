import { AppError } from '../utils/AppError.js';

export const updateUserProfile = async (user, payload) => {
  Object.assign(user, payload);
  await user.save();
  return user;
};

export const addUserAddress = async (user, payload) => {
  if (payload.isDefault) {
    user.addresses.forEach((address) => {
      address.isDefault = false;
    });
  }

  user.addresses.push(payload);
  await user.save();
  return user.addresses[user.addresses.length - 1];
};

export const updateUserAddress = async (user, addressId, payload) => {
  const address = user.addresses.id(addressId);

  if (!address) {
    throw new AppError('Address not found', 404);
  }

  if (payload.isDefault) {
    user.addresses.forEach((item) => {
      item.isDefault = false;
    });
  }

  Object.assign(address, payload);
  await user.save();
  return address;
};

export const removeUserAddress = async (user, addressId) => {
  const address = user.addresses.id(addressId);

  if (!address) {
    throw new AppError('Address not found', 404);
  }

  address.deleteOne();
  await user.save();
};
