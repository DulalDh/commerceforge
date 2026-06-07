import { useEffect, useState } from 'react';
import { AdminTable } from '../components/admin/AdminTable.jsx';
import { paymentApi } from '../services/paymentApi.js';

export const AdminPaymentVerificationPage = () => {
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState('');
  const load = () => paymentApi.adminList(status ? { status } : {}).then((response) => setPayments(response.data.data.payments || []));

  useEffect(() => { load().catch(() => {}); }, []);

  const verify = async (paymentId, nextStatus) => {
    await paymentApi.verify(paymentId, { status: nextStatus, note: `Marked ${nextStatus} by admin` });
    load();
  };

  return (
    <section>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-slate-950">Payment verification</h1>
        <div className="flex gap-2">
          <select className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setStatus(event.target.value)} value={status}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={load}>Filter</button>
        </div>
      </div>
      <div className="mt-6">
        <AdminTable columns={[
          { key: 'method', label: 'Method', render: (row) => row.method?.replaceAll('_', ' ') },
          { key: 'transactionId', label: 'Transaction' },
          { key: 'user', label: 'Customer', render: (row) => row.user?.name },
          { key: 'amount', label: 'Amount', render: (row) => `৳${row.amount}` },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions', render: (row) => ['bkash_manual', 'nagad_manual'].includes(row.method) ? <div className="flex gap-2"><button className="rounded-md bg-emerald-700 px-3 py-1 text-xs font-semibold text-white" onClick={() => verify(row._id, 'paid')}>Paid</button><button className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white" onClick={() => verify(row._id, 'failed')}>Failed</button><button className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold" onClick={() => verify(row._id, 'refunded')}>Refund</button></div> : 'N/A' }
        ]} rows={payments} />
      </div>
    </section>
  );
};
