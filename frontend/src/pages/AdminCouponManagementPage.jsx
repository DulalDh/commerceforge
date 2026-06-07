import { useEffect, useState } from 'react';
import { AdminTable } from '../components/admin/AdminTable.jsx';
import { ConfirmModal } from '../components/admin/ConfirmModal.jsx';
import { adminApi } from '../services/adminApi.js';

const emptyForm = { code: '', discountType: 'fixed', discountValue: '', expiryDate: '', minimumOrderAmount: '' };

export const AdminCouponManagementPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const load = () => adminApi.coupons().then((response) => setCoupons(response.data.data.coupons || []));

  useEffect(() => { load().catch(() => {}); }, []);

  const submit = async (event) => {
    event.preventDefault();
    const payload = { ...form, discountValue: Number(form.discountValue), minimumOrderAmount: Number(form.minimumOrderAmount || 0) };
    if (editingId) await adminApi.updateCoupon(editingId, payload);
    else await adminApi.createCoupon(payload);
    setForm(emptyForm);
    setEditingId(null);
    load();
  };

  const remove = async () => {
    await adminApi.deleteCoupon(confirmId);
    setConfirmId(null);
    load();
  };

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-950">Coupon management</h1>
      <form className="mt-6 grid gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200 md:grid-cols-6" onSubmit={submit}>
        <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setForm({ ...form, code: event.target.value })} placeholder="code" value={form.code} />
        <select className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setForm({ ...form, discountType: event.target.value })} value={form.discountType}><option value="fixed">fixed</option><option value="percentage">percentage</option></select>
        <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setForm({ ...form, discountValue: event.target.value })} placeholder="value" value={form.discountValue} />
        <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setForm({ ...form, minimumOrderAmount: event.target.value })} placeholder="minimum order" value={form.minimumOrderAmount} />
        <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setForm({ ...form, expiryDate: event.target.value })} type="date" value={form.expiryDate} />
        <button className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <div className="mt-6"><AdminTable columns={[
        { key: 'code', label: 'Code' }, { key: 'discountType', label: 'Type' }, { key: 'discountValue', label: 'Value' }, { key: 'expiryDate', label: 'Expiry', render: (row) => new Date(row.expiryDate).toLocaleDateString() },
        { key: 'actions', label: 'Actions', render: (row) => <div className="flex gap-2"><button className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold" onClick={() => { setEditingId(row._id); setForm({ code: row.code, discountType: row.discountType, discountValue: String(row.discountValue), minimumOrderAmount: String(row.minimumOrderAmount || 0), expiryDate: row.expiryDate?.slice(0, 10) || '' }); }}>Edit</button><button className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white" onClick={() => setConfirmId(row._id)}>Delete</button></div> }
      ]} rows={coupons} /></div>
      <ConfirmModal message="Delete this coupon?" onCancel={() => setConfirmId(null)} onConfirm={remove} open={Boolean(confirmId)} />
    </section>
  );
};
