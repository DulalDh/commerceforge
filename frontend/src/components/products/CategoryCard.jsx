export const CategoryCard = ({ category }) => {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
      <img alt={category.name} className="h-28 w-full object-cover" src={category.image} />
      <div className="p-4">
        <h3 className="font-bold text-slate-950">{category.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{category.count || 0} products</p>
      </div>
    </article>
  );
};
