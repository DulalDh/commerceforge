import { useEffect, useState } from 'react';
import { orderApi } from '../services/orderApi.js';
import { paymentApi } from '../services/paymentApi.js';

export const AdminOrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const load = () => orderApi.adminList().then((response) => setOrders(response.data.data.orders || []));
  const loadPayments = () => paymentApi.adminList().then((response) => setPayments(response.data.data.payments || []));

  useEffect(() => {
    load().catch(() => {});
    loadPayments().catch(() => {});
  }, []);

  const updateStatus = async (orderId, status) => {
    await orderApi.updateStatus(orderId, status);
    load();
  };

  const updateCourier = async (orderId) => {
    const courierName = window.prompt('Courier name');
    if (!courierName) return;
    const trackingId = window.prompt('Tracking ID') || '';
    await orderApi.updateCourier(orderId, { courierName, trackingId });
    load();
  };

  const updateDelivery = async (orderId, status) => {
    await orderApi.updateDeliveryStatus(orderId, { status, note: `Delivery marked as ${status}` });
    load();
  };

  const verifyPayment = async (paymentId, status) => {
    await paymentApi.verify(paymentId, { status, note: `Marked ${status} from admin order management` });
    load();
    loadPayments();
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-950">Order management</h1>
      <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr><th className="p-3">Order</th><th className="p-3">Customer</th><th className="p-3">Total</th><th className="p-3">Courier</th><th className="p-3">Payment</th><th className="p-3">Delivery</th><th className="p-3">Action</th></tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="border-t border-slate-100" key={order._id}>
                <td className="p-3 font-semibold">{order._id}</td>
                <td className="p-3">{order.user?.name || 'Customer'}</td>
                <td className="p-3">৳{order.totalAmount || order.total}</td>
                <td className="p-3">
                  <p>{order.courierName || '-'}</p>
                  <p className="text-xs text-slate-500">{order.trackingId || ''}</p>
                </td>
                <td className="p-3 capitalize">{order.paymentMethod?.replaceAll('_', ' ')} / {order.paymentStatus}</td>
                <td className="p-3">
                  <select className="rounded-md border border-slate-200 px-2 py-1" onChange={(event) => updateDelivery(order._id, event.target.value)} value={order.deliveryStatus || order.orderStatus}>
                    {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'].map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold" onClick={() => updateCourier(order._id)}>Courier</button>
                    <button className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold" onClick={() => updateStatus(order._id, order.deliveryStatus || order.orderStatus)}>Sync</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="mt-10 text-2xl font-bold text-slate-950">Manual payment verification</h2>
      <div className="mt-4 overflow-x-auto rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr><th className="p-3">Method</th><th className="p-3">Transaction</th><th className="p-3">Customer</th><th className="p-3">Amount</th><th className="p-3">Status</th><th className="p-3">Verify</th></tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr className="border-t border-slate-100" key={payment._id}>
                <td className="p-3 capitalize">{payment.method?.replaceAll('_', ' ')}</td>
                <td className="p-3">{payment.transactionId || payment.gatewayTransactionId || '-'}</td>
                <td className="p-3">{payment.user?.name || 'Customer'}</td>
                <td className="p-3">৳{payment.amount}</td>
                <td className="p-3 capitalize">{payment.status}</td>
                <td className="p-3">
                  {['bkash_manual', 'nagad_manual'].includes(payment.method) ? (
                    <div className="flex gap-2">
                      <button className="rounded-md bg-emerald-700 px-3 py-1 text-xs font-semibold text-white" onClick={() => verifyPayment(payment._id, 'paid')}>Paid</button>
                      <button className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white" onClick={() => verifyPayment(payment._id, 'failed')}>Failed</button>
                    </div>
                  ) : <span className="text-slate-400">N/A</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
