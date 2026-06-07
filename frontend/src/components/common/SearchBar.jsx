import { Search } from 'lucide-react';
import { useState } from 'react';

export const SearchBar = ({ defaultValue = '', onSearch }) => {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(value);
  };

  return (
    <form className="flex w-full items-center gap-2" onSubmit={handleSubmit}>
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search products"
          value={value}
        />
      </div>
      <button className="h-11 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800">
        Search
      </button>
    </form>
  );
};
