import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <p>
        © {new Date().getFullYear()} Employee Management System
      </p>
      <p>Built with React</p>
    </footer>
  );
}

export default Footer;