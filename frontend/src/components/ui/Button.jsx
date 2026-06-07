export const Button = ({ className = '', type = 'button', ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 ${className}`}
      type={type}
      {...props}
    />
  );
};
