import SearchFilterBar from "../components/SearchFilterBar";
import ContactTable from "../components/ContactTable";

export default function Home() {
  return (
    <div className="container">
      <SearchFilterBar />
      <ContactTable />
    </div>
  );
}
