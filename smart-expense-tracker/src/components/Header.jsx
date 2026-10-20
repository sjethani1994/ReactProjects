import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";
import React, { useContext, useState } from "react";
import { Sun, Moon } from "lucide-react";
import ThemeContext from "../utils/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme.isDark;

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

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
