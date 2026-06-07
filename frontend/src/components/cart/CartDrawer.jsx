import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore.js';

export const CartDrawer = () => {
  const { closeDrawer, isDrawerOpen, items } = useCartStore();
  const total = items.reduce((sum, item) => sum + (item.price || item.priceSnapshot || item.product?.price || 0) * item.quantity, 0);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40" onClick={closeDrawer}>
      <aside className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-950">Cart</h2>
          <button className="rounded-md p-2 hover:bg-slate-100" onClick={closeDrawer}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <p className="text-sm text-slate-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div className="rounded-md border border-slate-200 p-3" key={item._id || item.product?._id}>
                  <p className="font-semibold text-slate-950">{item.product?.name || 'Product'}</p>
                  <p className="mt-1 text-sm text-slate-600">Qty {item.quantity}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-slate-200 p-4">
          <div className="mb-4 flex justify-between text-sm font-bold">
            <span>Total</span>
            <span>৳{total}</span>
          </div>
          <Link className="block rounded-md bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white" onClick={closeDrawer} to="/cart">
            View Cart
          </Link>
        </div>
      </aside>
    </div>
  );
};
