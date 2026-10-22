
import { Link, NavLink } from "react-router-dom";
import { BookOpen } from "lucide-react";
import "../styles/Header.css";

function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="header-brand">
        <BookOpen size={28} />
        <span>LibraryHub</span>
      </Link>

      <nav className="header-nav">
        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/books">
          Books
        </NavLink>

        <NavLink to="/books/add">
          Add Book
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
