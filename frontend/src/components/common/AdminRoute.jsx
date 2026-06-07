import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';

export const AdminRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (user?.role !== 'admin') {
    return <Navigate replace to="/" />;
  }

  return <Outlet />;
};
