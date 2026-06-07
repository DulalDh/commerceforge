import { useEffect, useState } from 'react';
import { orderApi } from '../services/orderApi.js';
import { paymentApi } from '../services/paymentApi.js';

export const CheckoutPage = () => {
  const [form, setForm] = useState({ fullName: '', phone: '', division: '', district: '', upazila: '', area: '', addressLine: '' });
  const [deliveryArea, setDeliveryArea] = useState('inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
  const [paymentDetails, setPaymentDetails] = useState({ transactionId: '', senderNumber: '' });
  const [methods, setMethods] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    paymentApi.methods()
      .then((response) => setMethods(response.data.data.methods || []))
      .catch(() => {
        setMethods([
          { value: 'cash_on_delivery', label: 'Cash on Delivery' },
          { value: 'bkash_manual', label: 'bKash manual payment', requiresTransactionId: true },
          { value: 'nagad_manual', label: 'Nagad manual payment', requiresTransactionId: true },
          { value: 'sslcommerz', label: 'SSLCommerz', placeholder: true }
        ]);
      });
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    await orderApi.create({
      shippingAddress: form,
      deliveryArea,
      paymentMethod,
      paymentDetails: ['bkash_manual', 'nagad_manual'].includes(paymentMethod) ? paymentDetails : undefined,
      shippingCharge: deliveryArea === 'inside_dhaka' ? 80 : 130
    });
    setMessage(
      paymentMethod === 'sslcommerz'
        ? 'Order created. SSLCommerz checkout is ready for credential integration.'
        : 'Order created successfully.'
    );
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-950">Checkout</h1>
      <form className="mt-6 grid gap-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2" onSubmit={submit}>
        {Object.keys(form).map((key) => (
          <label className={key === 'addressLine' ? 'sm:col-span-2' : ''} key={key}>
            <span className="text-sm font-medium capitalize text-slate-700">{key.replace(/([A-Z])/g, ' $1')}</span>
            <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3" onChange={(event) => setForm({ ...form, [key]: event.target.value })} required={['fullName', 'phone', 'division', 'district', 'addressLine'].includes(key)} value={form[key]} />
          </label>
        ))}
        <div className="sm:col-span-2">
          <h2 className="text-base font-bold text-slate-950">Delivery area</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              { value: 'inside_dhaka', label: 'Inside Dhaka', charge: 80 },
              { value: 'outside_dhaka', label: 'Outside Dhaka', charge: 130 }
            ].map((option) => (
              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-200 p-3 text-sm" key={option.value}>
                <input checked={deliveryArea === option.value} name="deliveryArea" onChange={() => setDeliveryArea(option.value)} type="radio" />
                <span>
                  <span className="block font-semibold text-slate-950">{option.label}</span>
                  <span className="text-xs text-slate-500">Shipping charge ৳{option.charge}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <h2 className="text-base font-bold text-slate-950">Payment method</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {methods.map((method) => (
              <label className="flex cursor-pointer gap-3 rounded-md border border-slate-200 p-3 text-sm" key={method.value}>
                <input
                  checked={paymentMethod === method.value}
                  name="paymentMethod"
                  onChange={() => setPaymentMethod(method.value)}
                  type="radio"
                />
                <span>
                  <span className="block font-semibold text-slate-950">{method.label}</span>
                  {method.placeholder ? <span className="mt-1 block text-xs text-slate-500">Credential-ready placeholder integration</span> : null}
                </span>
              </label>
            ))}
          </div>
        </div>
        {['bkash_manual', 'nagad_manual'].includes(paymentMethod) ? (
          <div className="grid gap-4 rounded-md bg-slate-50 p-4 sm:col-span-2 sm:grid-cols-2">
            <p className="text-sm text-slate-600 sm:col-span-2">
              Send payment to the configured merchant number, then enter your transaction ID for admin verification.
            </p>
            <label>
              <span className="text-sm font-medium text-slate-700">Transaction ID</span>
              <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3" onChange={(event) => setPaymentDetails({ ...paymentDetails, transactionId: event.target.value })} required value={paymentDetails.transactionId} />
            </label>
            <label>
              <span className="text-sm font-medium text-slate-700">Sender number</span>
              <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3" onChange={(event) => setPaymentDetails({ ...paymentDetails, senderNumber: event.target.value })} value={paymentDetails.senderNumber} />
            </label>
          </div>
        ) : null}
        <button className="rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white sm:col-span-2">Place order</button>
        {message ? <p className="text-sm font-semibold text-emerald-700 sm:col-span-2">{message}</p> : null}
      </form>
    </section>
  );
};
