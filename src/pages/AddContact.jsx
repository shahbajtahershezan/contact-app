import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";

export default function AddContact() {
  const { actions } = useContacts();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    company: ""
  });

  const [err, setErr] = useState("");

  function setField(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setErr("First Name and Last Name are required.");
      return;
    }
    if (!form.email.trim() || !form.phone.trim()) {
      setErr("Email and Phone are required.");
      return;
    }

    await actions.addContact(form);
    navigate("/");
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Add New Contact</h2>

        {err ? <div className="alert">{err}</div> : null}

        <form onSubmit={onSubmit} className="grid">
          <label className="field">
            <span>First Name *</span>
            <input className="input" value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} />
          </label>

          <label className="field">
            <span>Last Name *</span>
            <input className="input" value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} />
          </label>

          <label className="field">
            <span>Email *</span>
            <input className="input" value={form.email} onChange={(e) => setField("email", e.target.value)} />
          </label>

          <label className="field">
            <span>Phone *</span>
            <input className="input" value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
          </label>

          <label className="field">
            <span>Company</span>
            <input className="input" value={form.company} onChange={(e) => setField("company", e.target.value)} />
          </label>

          <label className="field">
            <span>Address</span>
            <input className="input" value={form.address} onChange={(e) => setField("address", e.target.value)} />
          </label>

          <div className="formActions">
            <button type="button" className="btn" onClick={() => navigate("/")}>Cancel</button>
            <button className="btn btn--primary" type="submit">Save Contact</button>
          </div>
        </form>
      </div>
    </div>
  );
}
