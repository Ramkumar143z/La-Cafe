import React from 'react';
import './Footer.css';
import logoImg from './assets/logo.png';

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-grid">
          
          <div className="footer-col brand-col">
            <img src={logoImg} alt="La Cafe" className="footer-logo" />
            <p className="footer-desc">
              Crafting unforgettable moments, one cup at a time. Authenticity, passion, and a little bit of magic in every pour.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#signature">Signature Dishes</a></li>
              <li><a href="#menu">Our Menu</a></li>
              <li><a href="#philosophy">The Philosophy</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Visit Us</h4>
            <ul className="footer-links">
              <li>123 Artisan Avenue</li>
              <li>Brew District, NY 10012</li>
              <li>hello@lacafe.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Hours</h4>
            <ul className="footer-links">
              <li>Mon - Fri: 7am - 8pm</li>
              <li>Sat - Sun: 8am - 10pm</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} La Cafe. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
