import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi.js';
import { useAuthStore } from '../store/useAuthStore.js';

export const LoginPage = () => {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await authApi.login(form);
      setSession(response.data.data);
      navigate('/');
    } catch {
      setError('Invalid email or password.');
    }
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-8">
      <form className="w-full rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200" onSubmit={submit}>
        <h1 className="text-2xl font-bold text-slate-950">Login</h1>
        <label className="mt-5 block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3" onChange={(event) => setForm({ ...form, email: event.target.value })} type="email" value={form.email} />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3" onChange={(event) => setForm({ ...form, password: event.target.value })} type="password" value={form.password} />
        </label>
        {error ? <p className="mt-3 text-sm font-semibold text-red-600">{error}</p> : null}
        <button className="mt-5 w-full rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white">Login</button>
        <p className="mt-4 text-sm text-slate-600">
          New customer? <Link className="font-semibold text-emerald-700" to="/register">Create account</Link>
        </p>
      </form>
    </section>
  );
};
