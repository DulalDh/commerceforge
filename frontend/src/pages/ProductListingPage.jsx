import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/common/LoadingSpinner.jsx';
import { Pagination } from '../components/common/Pagination.jsx';
import { SearchBar } from '../components/common/SearchBar.jsx';
import { FilterSidebar } from '../components/products/FilterSidebar.jsx';
import { ProductCard } from '../components/products/ProductCard.jsx';
import { cartApi } from '../services/cartApi.js';
import { productApi } from '../services/productApi.js';
import { useCartStore } from '../store/useCartStore.js';

export const ProductListingPage = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 12 });
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const setCart = useCartStore((state) => state.setCart);
  const openDrawer = useCartStore((state) => state.openDrawer);

  useEffect(() => {
    setLoading(true);
    productApi.list(filters)
      .then((response) => {
        setProducts(response.data.data.items || []);
        setPagination(response.data.data.pagination || { page: 1, pages: 1 });
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [filters]);

  const addToCart = async (product) => {
    const response = await cartApi.addItem({ productId: product._id, quantity: 1 });
    setCart(response.data.data.cart);
    openDrawer();
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-950">Products</h1>
        <div className="mt-4 max-w-2xl">
          <SearchBar defaultValue={filters.search || ''} onSearch={(search) => setFilters({ ...filters, search, page: 1 })} />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <FilterSidebar filters={filters} onChange={setFilters} />
        <div>
          {loading ? <LoadingSpinner /> : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => <ProductCard key={product._id} onAddToCart={addToCart} product={product} />)}
              </div>
              {products.length === 0 ? <p className="rounded-lg bg-white p-6 text-sm text-slate-600 ring-1 ring-slate-200">No products found.</p> : null}
              <Pagination page={pagination.page} pages={pagination.pages} onChange={(page) => setFilters({ ...filters, page })} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
