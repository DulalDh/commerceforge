import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import { AdminRoute } from './AdminRoute.jsx';
import { useAuthStore } from '../../store/useAuthStore.js';

const renderProtected = () =>
  render(
    <MemoryRouter initialEntries={['/profile']}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<p>Protected content</p>} path="/profile" />
        </Route>
        <Route element={<p>Login page</p>} path="/login" />
      </Routes>
    </MemoryRouter>
  );

const renderAdmin = () =>
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route element={<AdminRoute />}>
          <Route element={<p>Admin content</p>} path="/admin" />
        </Route>
        <Route element={<p>Home page</p>} path="/" />
      </Routes>
    </MemoryRouter>
  );

describe('Route guards', () => {
  it('redirects unauthenticated users from protected routes', () => {
    renderProtected();
    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('allows authenticated users into protected routes', () => {
    useAuthStore.getState().setSession({
      user: { name: 'Customer', role: 'customer' },
      accessToken: 'token'
    });

    renderProtected();
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('redirects non-admin users from admin routes', () => {
    useAuthStore.getState().setSession({
      user: { name: 'Customer', role: 'customer' },
      accessToken: 'token'
    });

    renderAdmin();
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });

  it('allows admin users into admin routes', () => {
    useAuthStore.getState().setSession({
      user: { name: 'Admin', role: 'admin' },
      accessToken: 'token'
    });

    renderAdmin();
    expect(screen.getByText('Admin content')).toBeInTheDocument();
  });
});
