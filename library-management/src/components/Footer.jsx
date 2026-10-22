
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <p>
        © {new Date().getFullYear()} LibraryHub.
        <span> Manage your library with ease.</span>
      </p>
    </footer>
  );
}

export default Footer;
