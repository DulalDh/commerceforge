import { Menu, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';
import { useCartStore } from '../../store/useCartStore.js';

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/orders', label: 'Orders' }
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const openDrawer = useCartStore((state) => state.openDrawer);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="text-lg font-black text-slate-950" to="/">BD Bazaar AI</Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink className={({ isActive }) => `text-sm font-semibold ${isActive ? 'text-emerald-700' : 'text-slate-600 hover:text-slate-950'}`} key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
          {user?.role === 'admin' ? <NavLink className="text-sm font-semibold text-slate-600 hover:text-slate-950" to="/admin">Admin</NavLink> : null}
        </nav>
        <div className="flex items-center gap-2">
          <button className="rounded-md p-2 hover:bg-slate-100" onClick={openDrawer} title="Open cart">
            <ShoppingCart className="h-5 w-5" />
          </button>
          {user ? (
            <>
              <Link className="hidden rounded-md p-2 hover:bg-slate-100 sm:block" to="/profile" title="Profile">
                <User className="h-5 w-5" />
              </Link>
              <button className="hidden rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:block" onClick={clearSession}>
                Logout
              </button>
            </>
          ) : (
            <Link className="hidden rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white sm:block" to="/login">Login</Link>
          )}
          <button className="rounded-md p-2 hover:bg-slate-100 md:hidden" onClick={() => setOpen(!open)}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-slate-200 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => <Link key={link.to} onClick={() => setOpen(false)} to={link.to}>{link.label}</Link>)}
            {user?.role === 'admin' ? <Link onClick={() => setOpen(false)} to="/admin">Admin</Link> : null}
            <Link onClick={() => setOpen(false)} to={user ? '/profile' : '/login'}>{user ? 'Profile' : 'Login'}</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};
