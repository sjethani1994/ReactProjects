
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>
          © {new Date().getFullYear()} ExpenseTracker
        </p>

        <p className="footer-tagline">
          Track smarter. Spend better.
        </p>
      </div>
    </footer>
  );
};

export default Footer;