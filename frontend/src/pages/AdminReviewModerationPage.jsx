import { useEffect, useState } from 'react';
import { AdminTable } from '../components/admin/AdminTable.jsx';
import { adminApi } from '../services/adminApi.js';

export const AdminReviewModerationPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('');
  const load = () => adminApi.reviews(filter ? { isApproved: filter } : {}).then((response) => setReviews(response.data.data.reviews || []));

  useEffect(() => { load().catch(() => {}); }, []);

  const moderate = async (review, isApproved) => {
    await adminApi.moderateReview(review.product._id, review._id, { isApproved });
    load();
  };

  return (
    <section>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-slate-950">Review moderation</h1>
        <div className="flex gap-2">
          <select className="h-10 rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => setFilter(event.target.value)} value={filter}>
            <option value="">All</option>
            <option value="true">Approved</option>
            <option value="false">Pending</option>
          </select>
          <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={load}>Filter</button>
        </div>
      </div>
      <div className="mt-6">
        <AdminTable columns={[
          { key: 'product', label: 'Product', render: (row) => row.product?.name },
          { key: 'rating', label: 'Rating' },
          { key: 'comment', label: 'Comment' },
          { key: 'isApproved', label: 'Status', render: (row) => row.isApproved ? 'Approved' : 'Pending' },
          { key: 'actions', label: 'Actions', render: (row) => <div className="flex gap-2"><button className="rounded-md bg-emerald-700 px-3 py-1 text-xs font-semibold text-white" onClick={() => moderate(row, true)}>Approve</button><button className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white" onClick={() => moderate(row, false)}>Hide</button></div> }
        ]} rows={reviews} />
      </div>
    </section>
  );
};
