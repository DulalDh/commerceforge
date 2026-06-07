import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi.js';
import { useAuthStore } from '../store/useAuthStore.js';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (event) => {
    event.preventDefault();
    const response = await authApi.register(form);
    setSession(response.data.data);
    navigate('/');
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-8">
      <form className="w-full rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200" onSubmit={submit}>
        <h1 className="text-2xl font-bold text-slate-950">Register</h1>
        {['name', 'email', 'password'].map((field) => (
          <label className="mt-4 block" key={field}>
            <span className="text-sm font-medium capitalize text-slate-700">{field}</span>
            <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3" onChange={(event) => setForm({ ...form, [field]: event.target.value })} type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'} value={form[field]} />
          </label>
        ))}
        <button className="mt-5 w-full rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white">Create account</button>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account? <Link className="font-semibold text-emerald-700" to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};
