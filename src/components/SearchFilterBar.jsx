import { useContacts } from "../context/ContactContext";

export default function SearchFilterBar() {
  const { state, dispatch } = useContacts();

  return (
    <div className="bar">
      <input
        className="input"
        placeholder="Search by first name, last name, email, phone..."
        value={state.query}
        onChange={(e) => dispatch({ type: "SET_QUERY", payload: e.target.value })}
      />

      <select
        className="select"
        value={state.filter}
        onChange={(e) => dispatch({ type: "SET_FILTER", payload: e.target.value })}
      >
        <option value="NONE">Filter: None</option>
        <option value="FIRST_AZ">First Name (A → Z)</option>
        <option value="LAST_AZ">Last Name (A → Z)</option>
        <option value="OLDEST_FIRST">Oldest To First</option>
      </select>
    </div>
  );
}
