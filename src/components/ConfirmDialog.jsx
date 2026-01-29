export default function ConfirmDialog({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modalOverlay" onMouseDown={onCancel}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <p>{message}</p>
        <div className="modal__actions">
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn btn--danger" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
