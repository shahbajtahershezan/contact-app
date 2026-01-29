import { useMemo, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useContacts } from "../context/ContactContext";
import ContactModal from "./ContactModal";
import ConfirmDialog from "./ConfirmDialog";
import EmptyState from "./EmptyState";

export default function ContactTable() {
  const { state, actions, visibleContacts } = useContacts();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("VIEW"); // VIEW | EDIT
  const [selected, setSelected] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const hasNoData = useMemo(() => visibleContacts.length === 0, [visibleContacts.length]);

  function openView(contact) {
    setSelected(contact);
    setModalMode("VIEW");
    setModalOpen(true);
  }

  function openEdit(contact) {
    setSelected(contact);
    setModalMode("EDIT");
    setModalOpen(true);
  }

  function askDelete(id) {
    setDeleteId(id);
    setConfirmOpen(true);
  }

  async function doDelete() {
    try {
      await actions.deleteContact(deleteId);
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  }

  async function saveUpdate(updated) {
    const { id, ...payload } = updated;
    await actions.updateContact(id, payload);
    setModalOpen(false);
  }

  if (state.loading) return <div className="card">Loading...</div>;
  if (state.error) return <div className="card error">Error: {state.error}</div>;
  if (hasNoData) return <EmptyState text="No Contact Information" />;

  return (
    <>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ width: 160 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleContacts.map((c) => (
              <tr key={c.id}>
                <td>{c.firstName} {c.lastName}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td className="actions">
                  {/* show icon -> view modal (with edit option inside requirement)
                      এখানে VIEW modal খুলে edit button রাখলে হয়, তবে আমি আলাদা edit icon-ও দিয়েছি */}
                  <button className="iconBtn" title="Show" onClick={() => openView(c)}><FaEye /></button>
                  <button className="iconBtn" title="Edit" onClick={() => openEdit(c)}><FaEdit /></button>
                  <button className="iconBtn danger" title="Delete" onClick={() => askDelete(c.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ContactModal
        open={modalOpen}
        mode={modalMode}
        contact={selected}
        onClose={() => setModalOpen(false)}
        onSave={saveUpdate}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Contact?"
        message="Are you sure you want to delete this contact? This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={doDelete}
      />
    </>
  );
}
