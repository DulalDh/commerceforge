import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem
} from '../services/cart.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getMyCart = asyncHandler(async (req, res) => {
  const cart = await getCart(req.user.id);
  res.json({ success: true, data: { cart } });
});

export const addCartItem = asyncHandler(async (req, res) => {
  const cart = await addToCart(req.user.id, req.validated.body);
  res.status(201).json({ success: true, data: { cart } });
});

export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const cart = await updateCartItem(
    req.user.id,
    req.validated.params.itemId,
    req.validated.body.quantity
  );
  res.json({ success: true, data: { cart } });
});

export const deleteCartItem = asyncHandler(async (req, res) => {
  const cart = await removeCartItem(req.user.id, req.params.itemId);
  res.json({ success: true, data: { cart } });
});

export const clearMyCart = asyncHandler(async (req, res) => {
  const cart = await clearCart(req.user.id);
  res.json({ success: true, data: { cart } });
});
