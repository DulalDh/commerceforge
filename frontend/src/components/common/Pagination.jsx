export const Pagination = ({ page = 1, pages = 1, onChange }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        className="rounded-md border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Previous
      </button>
      <span className="px-3 text-sm font-medium text-slate-700">
        Page {page} of {pages}
      </span>
      <button
        className="rounded-md border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};
