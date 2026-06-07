import { Outlet } from 'react-router-dom';
import { CartDrawer } from '../cart/CartDrawer.jsx';
import { Footer } from './Footer.jsx';
import { Navbar } from './Navbar.jsx';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main className="min-h-[calc(100vh-8rem)]">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
