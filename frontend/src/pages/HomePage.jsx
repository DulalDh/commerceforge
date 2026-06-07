import { Link } from 'react-router-dom';
import { CategoryCard } from '../components/products/CategoryCard.jsx';
import { ProductCard } from '../components/products/ProductCard.jsx';

const featuredProducts = [
  { _id: 'sample-1', name: 'Premium Cotton Panjabi', category: 'Fashion', price: 1850, discountPrice: 1590, description: 'Comfortable daily and occasion wear.', images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=900&auto=format&fit=crop'] },
  { _id: 'sample-2', name: 'Bluetooth Earbuds', category: 'Electronics', price: 2450, description: 'Compact sound for daily use.', images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=900&auto=format&fit=crop'] },
  { _id: 'sample-3', name: 'Cooking Set', category: 'Home Essentials', price: 3990, description: 'Durable cookware for family kitchens.', images: ['https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=900&auto=format&fit=crop'] }
];

const categories = [
  { name: 'Fashion', count: 128, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=900&auto=format&fit=crop' },
  { name: 'Electronics', count: 84, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=900&auto=format&fit=crop' },
  { name: 'Home Essentials', count: 62, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=900&auto=format&fit=crop' }
];

export const HomePage = () => {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">Bangladesh ecommerce</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-normal text-slate-950 md:text-5xl">
              Shop faster with smart search, local payments, and curated products.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
              A responsive storefront ready for COD, bKash, Nagad, SSLCommerz, and AI-powered shopping workflows.
            </p>
            <Link className="mt-8 inline-flex rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800" to="/products">
              Browse products
            </Link>
          </div>
          <img alt="Ecommerce products" className="h-80 w-full rounded-lg object-cover shadow-sm" src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200&auto=format&fit=crop" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-950">Popular categories</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => <CategoryCard category={category} key={category.name} />)}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-950">Featured products</h2>
          <Link className="text-sm font-semibold text-emerald-700" to="/products">View all</Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};
