import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="company-info">
          <h4>About Us</h4>
          <p>Cozey Cradles</p>
          <p>Phone: 1-800-456-7890</p>
          <p>Email: cozeycradles@gmail.com</p>
        </div>
        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div className="social-media">
          <h4>Connect with Us</h4>
          <ul>
            <li><a href="https://www.facebook.com/">Facebook</a></li>
            <li><a href="https://www.twitter.com/">Twitter</a></li>
            <li><a href="https://www.instagram.com/">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cradle. All rights reserved.</p>
        <p><a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
      </div>
    </footer>
  );
}

export default Footer;