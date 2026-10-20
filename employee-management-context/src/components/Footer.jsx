import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} EmployeeHub. All rights reserved.</p>

      <p className="footer-tagline">Employee Management System</p>
    </footer>
  );
};

export default Footer;
