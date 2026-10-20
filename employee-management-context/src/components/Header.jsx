import { NavLink } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <NavLink to="/employees" className="header-brand">
        <span className="brand-icon">E</span>
        <span>EmployeeHub</span>
      </NavLink>

      <nav className="header-nav">
        <NavLink
          to="/employees"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Employees
        </NavLink>

        <NavLink
          to="add"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Add Employee
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Reports
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
