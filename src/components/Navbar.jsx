import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <Link className="brand" to="/">Contact App</Link>
        <nav className="nav__links">
          <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/add" className={({isActive}) => isActive ? "active" : ""}>Add New</NavLink>
        </nav>
      </div>
    </header>
  );
}
