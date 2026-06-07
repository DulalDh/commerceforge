import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartApi } from '../services/cartApi.js';
import { useCartStore } from '../store/useCartStore.js';

export const CartPage = () => {
  const { items, setCart } = useCartStore();
  const total = items.reduce((sum, item) => sum + (item.price || item.priceSnapshot || item.product?.price || 0) * item.quantity, 0);

  useEffect(() => {
    cartApi.get().then((response) => setCart(response.data.data.cart)).catch(() => {});
  }, [setCart]);

  const updateQuantity = async (itemId, quantity) => {
    const response = await cartApi.updateItem(itemId, { quantity });
    setCart(response.data.data.cart);
  };

  const removeItem = async (itemId) => {
    const response = await cartApi.removeItem(itemId);
    setCart(response.data.data.cart);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-950">Cart</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {items.map((item) => (
            <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200" key={item._id}>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-bold text-slate-950">{item.product?.name}</h2>
                  <p className="text-sm text-slate-600">৳{item.price || item.priceSnapshot}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input className="h-10 w-20 rounded-md border border-slate-200 px-3" min="1" onChange={(event) => updateQuantity(item._id, Number(event.target.value))} type="number" value={item.quantity} />
                  <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold" onClick={() => removeItem(item._id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 ? <p className="rounded-lg bg-white p-6 text-slate-600 ring-1 ring-slate-200">Your cart is empty.</p> : null}
        </div>
        <aside className="h-fit rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-bold">Order summary</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span>Total</span>
            <span className="font-bold">৳{total}</span>
          </div>
          <Link className="mt-5 block rounded-md bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white" to="/checkout">
            Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
};
