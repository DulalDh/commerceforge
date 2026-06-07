export const ConfirmModal = ({ message, onCancel, onConfirm, open }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
        <h2 className="text-lg font-bold text-slate-950">Confirm action</h2>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold" onClick={onCancel}>
            Cancel
          </button>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
