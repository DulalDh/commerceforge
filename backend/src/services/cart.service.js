import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { AppError } from '../utils/AppError.js';

const populateCart = (query) => query.populate('items.product');

const getOrCreateCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  return cart || Cart.create({ user: userId, items: [] });
};

export const getCart = async (userId) => {
  const cart = await getOrCreateCart(userId);
  return populateCart(Cart.findById(cart.id));
};

export const addToCart = async (userId, { productId, quantity, variant }) => {
  const product = await Product.findById(productId);

  if (!product || !product.isActive) {
    throw new AppError('Product not found', 404);
  }

  if (product.stock < quantity) {
    throw new AppError('Requested quantity exceeds available stock', 400);
  }

  const cart = await getOrCreateCart(userId);
  const existingItem = cart.items.find((item) => {
    const sameProduct = item.product.toString() === productId;
    const sameSize = (item.variant?.size || '') === (variant?.size || '');
    const sameColor = (item.variant?.color || '') === (variant?.color || '');
    return sameProduct && sameSize && sameColor;
  });

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.priceSnapshot = product.price;
  } else {
    cart.items.push({
      product: product.id,
      quantity,
      variant,
      price: product.price,
      priceSnapshot: product.price
    });
  }

  await cart.save();
  return populateCart(Cart.findById(cart.id));
};

export const updateCartItem = async (userId, itemId, quantity) => {
  const cart = await getOrCreateCart(userId);
  const item = cart.items.id(itemId);

  if (!item) {
    throw new AppError('Cart item not found', 404);
  }

  const product = await Product.findById(item.product);
  if (!product || product.stock < quantity) {
    throw new AppError('Requested quantity exceeds available stock', 400);
  }

  item.quantity = quantity;
  item.price = product.price;
  item.priceSnapshot = product.price;
  await cart.save();
  return populateCart(Cart.findById(cart.id));
};

export const removeCartItem = async (userId, itemId) => {
  const cart = await getOrCreateCart(userId);
  const item = cart.items.id(itemId);

  if (!item) {
    throw new AppError('Cart item not found', 404);
  }

  item.deleteOne();
  await cart.save();
  return populateCart(Cart.findById(cart.id));
};

export const clearCart = async (userId) => {
  const cart = await getOrCreateCart(userId);
  cart.items = [];
  await cart.save();
  return cart;
};
