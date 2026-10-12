import "../styles/Header.css";

function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="brand-icon">EM</span>
        <h2>Employee Management</h2>
      </div>

      <nav className="header-nav">
        <a href="/">Home</a>
        <a href="/employees">Employees</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
}

export default Header;
