import { BarChart3, Boxes, LayoutDashboard, MessageSquare, Receipt, Tags, Ticket, Truck, Users } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Boxes },
  { to: '/admin/categories', label: 'Categories', icon: Tags },
  { to: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { to: '/admin/orders', label: 'Orders', icon: Truck },
  { to: '/admin/payments', label: 'Payments', icon: Receipt },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/reviews', label: 'Reviews', icon: MessageSquare }
];

export const AdminLayout = () => {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
      <aside className="h-fit rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <div className="mb-3 flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-950">
          <BarChart3 className="h-4 w-4" />
          Admin Panel
        </div>
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                className={({ isActive }) =>
                  `flex min-w-fit items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${isActive ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-100'}`
                }
                end={link.to === '/admin'}
                key={link.to}
                to={link.to}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
};
