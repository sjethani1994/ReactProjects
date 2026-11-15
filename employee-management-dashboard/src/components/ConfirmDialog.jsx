import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Reusable confirm popup (like an Angular Material confirm dialog).
 *
 * The parent controls it:
 *   open      → show / hide
 *   onConfirm → called when the red button is clicked
 *   onCancel  → called on Cancel, backdrop click or Escape key
 */
const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  // Close on Escape key — only listen while the dialog is open
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // cleanup
  }, [open, onCancel]);

  if (!open) return null; // closed → render nothing

  // createPortal renders into <body> instead of inside the table, so the popup
  // sits above everything (like Angular CDK's overlay container).
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onCancel} // click on the dark backdrop → cancel
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()} // clicks inside the card don't reach the backdrop
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg font-bold text-red-600">
            !
          </div>
          <div>
            <h2
              id="confirm-dialog-title"
              className="text-lg font-semibold text-slate-800"
            >
              {title}
            </h2>
            {message && (
              <p className="mt-2 text-sm text-slate-500">{message}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            autoFocus // keyboard focus starts on the safe choice
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmDialog;
