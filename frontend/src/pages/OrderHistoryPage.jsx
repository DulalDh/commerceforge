import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderApi } from '../services/orderApi.js';

export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderApi.mine().then((response) => setOrders(response.data.data.orders || [])).catch(() => {});
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-950">Order history</h1>
      <div className="mt-6 space-y-3">
        {orders.map((order) => (
          <article className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200" key={order._id}>
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <div>
                <h2 className="font-bold text-slate-950">Order #{order._id}</h2>
                <p className="text-sm text-slate-600">{order.items?.length || 0} items</p>
              </div>
              <div className="text-sm sm:text-right">
                <p className="font-bold">৳{order.totalAmount || order.total}</p>
                <p className="capitalize text-slate-600">{order.deliveryStatus || order.orderStatus}</p>
                <Link className="mt-1 inline-block font-semibold text-emerald-700" to={`/orders/${order._id}/tracking`}>Track order</Link>
              </div>
            </div>
          </article>
        ))}
        {orders.length === 0 ? <p className="rounded-lg bg-white p-6 text-slate-600 ring-1 ring-slate-200">No orders yet.</p> : null}
      </div>
    </section>
  );
};
