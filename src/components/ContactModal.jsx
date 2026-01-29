import { useEffect, useState } from "react";

export default function ContactModal({ open, mode, contact, onClose, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    setForm(contact ? { ...contact } : null);
  }, [contact]);

  if (!open || !contact || !form) return null;

  const readOnly = mode === "VIEW";

  function setField(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  return (
    <div className="modalOverlay" onMouseDown={onClose}>
      <div className="modal modal--wide" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <h2 style={{ margin: 0 }}>
            {mode === "VIEW" ? "Contact Details" : "Edit Contact"}
          </h2>
          <button className="iconBtn" onClick={onClose}>✕</button>
        </div>

        <div className="grid">
          <label className="field">
            <span>First Name</span>
            <input className="input" value={form.firstName || ""} disabled={readOnly}
              onChange={(e) => setField("firstName", e.target.value)} />
          </label>

          <label className="field">
            <span>Last Name</span>
            <input className="input" value={form.lastName || ""} disabled={readOnly}
              onChange={(e) => setField("lastName", e.target.value)} />
          </label>

          <label className="field">
            <span>Email</span>
            <input className="input" value={form.email || ""} disabled={readOnly}
              onChange={(e) => setField("email", e.target.value)} />
          </label>

          <label className="field">
            <span>Phone</span>
            <input className="input" value={form.phone || ""} disabled={readOnly}
              onChange={(e) => setField("phone", e.target.value)} />
          </label>

          <label className="field">
            <span>Company</span>
            <input className="input" value={form.company || ""} disabled={readOnly}
              onChange={(e) => setField("company", e.target.value)} />
          </label>

          <label className="field">
            <span>Address</span>
            <input className="input" value={form.address || ""} disabled={readOnly}
              onChange={(e) => setField("address", e.target.value)} />
          </label>
        </div>

        <div className="modal__actions">
          <button className="btn" onClick={onClose}>Close</button>
          {mode !== "VIEW" && (
            <button
              className="btn btn--primary"
              onClick={() => onSave(form)}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
