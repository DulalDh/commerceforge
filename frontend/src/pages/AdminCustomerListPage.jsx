import { useEffect, useState } from 'react';
import { AdminTable } from '../components/admin/AdminTable.jsx';
import { adminApi } from '../services/adminApi.js';

export const AdminCustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const load = () => adminApi.customers({ search }).then((response) => setCustomers(response.data.data.customers || []));

  useEffect(() => { load().catch(() => {}); }, []);

  return (
    <section>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-slate-950">Customers</h1>
        <div className="flex gap-2">
          <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setSearch(event.target.value)} placeholder="Search customers" value={search} />
          <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={load}>Search</button>
        </div>
      </div>
      <div className="mt-6">
        <AdminTable columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'createdAt', label: 'Joined', render: (row) => new Date(row.createdAt).toLocaleDateString() }
        ]} rows={customers} />
      </div>
    </section>
  );
};
