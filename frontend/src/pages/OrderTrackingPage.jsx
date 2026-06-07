import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/common/LoadingSpinner.jsx';
import { orderApi } from '../services/orderApi.js';

const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'];

export const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderApi.detail(orderId)
      .then((response) => setOrder(response.data.data.order))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <LoadingSpinner />;
  if (!order) return <p className="mx-auto max-w-5xl px-4 py-8">Order not found.</p>;

  const currentIndex = statuses.indexOf(order.deliveryStatus || order.orderStatus);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Track order</h1>
          <p className="mt-2 text-sm text-slate-600">Order #{order._id}</p>
        </div>
        <Link className="text-sm font-semibold text-emerald-700" to="/orders">Back to orders</Link>
      </div>

      <div className="mt-6 grid gap-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">Courier</p>
          <p className="font-bold text-slate-950">{order.courierName || 'Not assigned yet'}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Tracking ID</p>
          <p className="font-bold text-slate-950">{order.trackingId || 'Pending'}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Delivery area</p>
          <p className="font-bold capitalize text-slate-950">{order.deliveryArea?.replaceAll('_', ' ')}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Estimated delivery</p>
          <p className="font-bold text-slate-950">
            {order.estimatedDeliveryDate ? new Date(order.estimatedDeliveryDate).toLocaleDateString() : 'Pending'}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-bold text-slate-950">Order timeline</h2>
        <div className="mt-5 space-y-4">
          {statuses.map((status, index) => {
            const active = index <= currentIndex && !['cancelled', 'returned'].includes(order.deliveryStatus);
            const timelineItem = order.statusTimeline?.find((item) => item.status === status);
            return (
              <div className="flex gap-3" key={status}>
                <span className={`mt-1 h-4 w-4 rounded-full ${active || order.deliveryStatus === status ? 'bg-emerald-700' : 'bg-slate-200'}`} />
                <div>
                  <p className="font-semibold capitalize text-slate-950">{status}</p>
                  <p className="text-sm text-slate-500">
                    {timelineItem?.note || (active ? 'Completed' : 'Waiting')}
                  </p>
                  {timelineItem?.changedAt ? <p className="text-xs text-slate-400">{new Date(timelineItem.changedAt).toLocaleString()}</p> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
