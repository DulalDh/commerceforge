import { useEffect, useState } from 'react';
import { adminApi } from '../services/adminApi.js';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    adminApi.stats().then((response) => setStats(response.data.data.stats || {})).catch(() => {});
  }, []);

  const cards = [
    { label: 'Total sales', value: `৳${stats.totalSales || 0}` },
    { label: 'Total orders', value: stats.totalOrders || 0 },
    { label: 'Pending orders', value: stats.pendingOrders || 0 },
    { label: 'Low stock products', value: stats.lowStockProducts || 0 },
    { label: 'Customers', value: stats.totalCustomers || 0 },
    { label: 'Products', value: stats.totalProducts || 0 }
  ];

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-950">Admin dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200" key={card.label}>
            <p className="text-sm font-semibold text-slate-500">{card.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-950">{card.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
