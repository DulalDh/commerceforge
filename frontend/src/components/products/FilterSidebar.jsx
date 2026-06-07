export const FilterSidebar = ({ filters, onChange }) => {
  const update = (key, value) => onChange({ ...filters, [key]: value, page: 1 });

  return (
    <aside className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-base font-bold text-slate-950">Filters</h2>
      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <input className="mt-1 h-10 w-full rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => update('category', event.target.value)} value={filters.category || ''} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Brand</span>
          <input className="mt-1 h-10 w-full rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => update('brand', event.target.value)} value={filters.brand || ''} />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Min</span>
            <input className="mt-1 h-10 w-full rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => update('minPrice', event.target.value)} value={filters.minPrice || ''} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Max</span>
            <input className="mt-1 h-10 w-full rounded-md border border-slate-200 px-3 text-sm" onChange={(event) => update('maxPrice', event.target.value)} value={filters.maxPrice || ''} />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input checked={filters.inStock === 'true'} onChange={(event) => update('inStock', event.target.checked ? 'true' : '')} type="checkbox" />
          In stock only
        </label>
      </div>
    </aside>
  );
};
