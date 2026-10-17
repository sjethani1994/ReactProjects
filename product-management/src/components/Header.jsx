import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="brand">
          <span className="brand-icon">P</span>
          <span>ProductHub</span>
        </Link>

        <nav className="header-nav">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>

          <NavLink to="/products" className="nav-link">
            Products
          </NavLink>
        </nav>

        <div className="header-tagline">
          Manage your products
        </div>
      </div>
    </header>
  );
}

export default Header;