import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p className="footer-copyright">
          © {new Date().getFullYear()} ProductHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;