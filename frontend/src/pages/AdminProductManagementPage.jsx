import { useEffect, useState } from 'react';
import { AdminTable } from '../components/admin/AdminTable.jsx';
import { ConfirmModal } from '../components/admin/ConfirmModal.jsx';
import { productApi } from '../services/productApi.js';

const emptyForm = { name: '', category: '', brand: '', price: '', stock: '', shortDescription: '' };

export const AdminProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [confirmId, setConfirmId] = useState(null);

  const load = () => productApi.list({ limit: 100, search }).then((response) => setProducts(response.data.data.items || []));

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock), images: [], variants: [] };
    if (editingId) await productApi.update(editingId, payload);
    else await productApi.create(payload);
    setForm(emptyForm);
    setEditingId(null);
    load();
  };

  const edit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || '',
      category: product.category?.name || product.category || '',
      brand: product.brand || '',
      price: String(product.price || ''),
      stock: String(product.stock || ''),
      shortDescription: product.shortDescription || ''
    });
  };

  const remove = async () => {
    await productApi.remove(confirmId);
    setConfirmId(null);
    load();
  };

  return (
    <section>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-slate-950">Product management</h1>
        <div className="flex gap-2">
          <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setSearch(event.target.value)} placeholder="Search products" value={search} />
          <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={load}>Search</button>
        </div>
      </div>
      <form className="mt-6 grid gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200 md:grid-cols-3" onSubmit={submit}>
        {Object.keys(form).map((key) => (
          <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" key={key} onChange={(event) => setForm({ ...form, [key]: event.target.value })} placeholder={key} value={form[key]} />
        ))}
        <button className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">{editingId ? 'Update product' : 'Add product'}</button>
      </form>
      <div className="mt-6">
        <AdminTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'category', label: 'Category', render: (row) => row.category?.name || row.category },
            { key: 'price', label: 'Price', render: (row) => `৳${row.price}` },
            { key: 'stock', label: 'Stock' },
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => (
                <div className="flex gap-2">
                  <button className="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold" onClick={() => edit(row)}>Edit</button>
                  <button className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white" onClick={() => setConfirmId(row._id)}>Delete</button>
                </div>
              )
            }
          ]}
          rows={products}
        />
      </div>
      <ConfirmModal message="Delete this product?" onCancel={() => setConfirmId(null)} onConfirm={remove} open={Boolean(confirmId)} />
    </section>
  );
};
