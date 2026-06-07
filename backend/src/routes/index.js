import { Router } from 'express';
import { aiRoutes } from '../modules/ai/ai.routes.js';
import { adminRoutes } from '../modules/admin/admin.routes.js';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { cartRoutes } from '../modules/cart/cart.routes.js';
import { orderRoutes } from '../modules/orders/order.routes.js';
import { paymentRoutes } from '../modules/payments/payment.routes.js';
import { productRoutes } from '../modules/products/product.routes.js';
import { userRoutes } from '../modules/users/user.routes.js';

export const apiRoutes = Router();

apiRoutes.get('/', (_req, res) => {
  res.json({
    name: 'Bangladesh AI Ecommerce API',
    version: 'v1'
  });
});

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/admin', adminRoutes);
apiRoutes.use('/users', userRoutes);
apiRoutes.use('/products', productRoutes);
apiRoutes.use('/cart', cartRoutes);
apiRoutes.use('/orders', orderRoutes);
apiRoutes.use('/payments', paymentRoutes);
apiRoutes.use('/ai', aiRoutes);
