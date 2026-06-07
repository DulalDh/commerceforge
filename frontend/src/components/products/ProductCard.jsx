import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product, onAddToCart }) => {
  const image = product.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop';

  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
      <Link to={`/products/${product._id}`}>
        <img alt={product.name} className="h-48 w-full object-cover" src={image} />
      </Link>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase text-emerald-700">{product.category?.name || product.category}</p>
        <Link className="mt-2 block text-lg font-bold text-slate-950 hover:text-emerald-700" to={`/products/${product._id}`}>
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.shortDescription || product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-slate-950">৳{product.discountPrice || product.price}</p>
            {product.discountPrice ? <p className="text-sm text-slate-400 line-through">৳{product.price}</p> : null}
          </div>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-700 text-white hover:bg-emerald-800"
            onClick={() => onAddToCart?.(product)}
            title="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
