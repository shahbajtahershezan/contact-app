export default function EmptyState({ text = "No Contact Information" }) {
  return (
    <div className="empty">
      <h3>{text}</h3>
      <p>Try adding a new contact or change your search/filter.</p>
    </div>
  );
}
