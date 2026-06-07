import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <section className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link className="mt-4 text-emerald-700 underline" to="/">
        Back to home
      </Link>
    </section>
  );
};
