import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct
} from '../services/product.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getProducts = asyncHandler(async (req, res) => {
  const result = await listProducts(req.query);
  res.json({ success: true, data: result });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await getProductById(req.params.productId);
  res.json({ success: true, data: { product } });
});

export const createProductController = asyncHandler(async (req, res) => {
  const product = await createProduct(req.validated.body);
  res.status(201).json({ success: true, data: { product } });
});

export const updateProductController = asyncHandler(async (req, res) => {
  const product = await updateProduct(req.validated.params.productId, req.validated.body);
  res.json({ success: true, data: { product } });
});

export const deleteProductController = asyncHandler(async (req, res) => {
  await deleteProduct(req.params.productId);
  res.status(204).send();
});

export const getProductStatus = (_req, res) => {
  res.json({ success: true, module: 'products', status: 'ready' });
};
