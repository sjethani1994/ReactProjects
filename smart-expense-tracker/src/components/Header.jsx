import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="app-logo">
          <span className="logo-icon">₹</span>
          <span>
            Expense<span className="logo-highlight">Tracker</span>
          </span>
        </Link>

        <nav className="header-nav">
          <NavLink to="/" end>
            Dashboard
          </NavLink>

          <NavLink to="/expenses">Expenses</NavLink>

          <NavLink to="/expenses/add" className="add-expense-btn">
            + Add Expense
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
