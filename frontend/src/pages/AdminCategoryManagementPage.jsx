import { useEffect, useState } from 'react';
import { AdminTable } from '../components/admin/AdminTable.jsx';
import { ConfirmModal } from '../components/admin/ConfirmModal.jsx';
import { adminApi } from '../services/adminApi.js';

const emptyForm = { name: '', image: '' };

export const AdminCategoryManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [confirmId, setConfirmId] = useState(null);
  const load = () => adminApi.categories({ search }).then((response) => setCategories(response.data.data.categories || []));

  useEffect(() => { load().catch(() => {}); }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (editingId) await adminApi.updateCategory(editingId, form);
    else await adminApi.createCategory(form);
    setForm(emptyForm);
    setEditingId(null);
    load();
  };

  const remove = async () => {
    await adminApi.deleteCategory(confirmId);
    setConfirmId(null);
    load();
  };

  return (
    <section>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-slate-950">Category management</h1>
        <div className="flex gap-2"><input className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setSearch(event.target.value)} placeholder="Search" value={search} /><button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={load}>Search</button></div>
      </div>
      <form className="mt-6 grid gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:grid-cols-3" onSubmit={submit}>
        <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="name" value={form.name} />
        <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="image URL" value={form.image} />
        <button className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <div className="mt-6"><AdminTable columns={[
        { key: 'name', label: 'Name' },
        { key: 'slug', label: 'Slug' },
        { key: 'actions', label: 'Actions', render: (row) => <div className="flex gap-2"><button className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold" onClick={() => { setEditingId(row._id); setForm({ name: row.name, image: row.image || '' }); }}>Edit</button><button className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white" onClick={() => setConfirmId(row._id)}>Delete</button></div> }
      ]} rows={categories} /></div>
      <ConfirmModal message="Delete this category?" onCancel={() => setConfirmId(null)} onConfirm={remove} open={Boolean(confirmId)} />
    </section>
  );
};
