import Link from "next/link";
import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-links">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/#our-services">Services</Link>
            </li>
            <li>
              <Link href="/#find-us">Find Us</Link>
            </li>
            <li>
              <Link href="/#gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-info">
          <p>&copy; E-state Office</p>
          <p>Email: info@example.com</p>
          <p>Phone: +1234567890</p>
          <p>BIT Mesra College Campus,Mesra, Ranchi, Jharkhand 835215</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
