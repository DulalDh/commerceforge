import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/common/LoadingSpinner.jsx';
import { cartApi } from '../services/cartApi.js';
import { productApi } from '../services/productApi.js';
import { useCartStore } from '../store/useCartStore.js';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const setCart = useCartStore((state) => state.setCart);
  const openDrawer = useCartStore((state) => state.openDrawer);

  useEffect(() => {
    productApi.details(productId)
      .then((response) => setProduct(response.data.data.product))
      .finally(() => setLoading(false));
  }, [productId]);

  const addToCart = async () => {
    const response = await cartApi.addItem({ productId: product._id, quantity: 1 });
    setCart(response.data.data.cart);
    openDrawer();
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return <p className="mx-auto max-w-7xl px-4 py-10">Product not found.</p>;

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
      <img alt={product.name} className="h-96 w-full rounded-lg object-cover" src={product.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'} />
      <div>
        <p className="text-sm font-semibold uppercase text-emerald-700">{product.category?.name || product.category}</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">{product.name}</h1>
        <p className="mt-4 text-slate-600">{product.description}</p>
        <p className="mt-6 text-3xl font-bold text-slate-950">৳{product.discountPrice || product.price}</p>
        <p className="mt-2 text-sm text-slate-500">Stock: {product.stock}</p>
        <button className="mt-8 rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800" onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </section>
  );
};
