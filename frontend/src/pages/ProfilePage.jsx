import { useEffect, useState } from 'react';
import { authApi } from '../services/authApi.js';
import { useAuthStore } from '../store/useAuthStore.js';

export const ProfilePage = () => {
  const storedUser = useAuthStore((state) => state.user);
  const [form, setForm] = useState({ name: storedUser?.name || '', phone: storedUser?.phone || '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    authApi.profile().then((response) => {
      const user = response.data.data.user;
      setForm({ name: user.name || '', phone: user.phone || '' });
    }).catch(() => {});
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    await authApi.updateProfile(form);
    setMessage('Profile updated.');
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-950">Profile</h1>
      <form className="mt-6 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200" onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3" onChange={(event) => setForm({ ...form, name: event.target.value })} value={form.name} />
          </label>
          <label>
            <span className="text-sm font-medium text-slate-700">Phone</span>
            <input className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3" onChange={(event) => setForm({ ...form, phone: event.target.value })} value={form.phone} />
          </label>
        </div>
        <button className="mt-5 rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white">Save profile</button>
        {message ? <p className="mt-3 text-sm font-semibold text-emerald-700">{message}</p> : null}
      </form>
    </section>
  );
};
