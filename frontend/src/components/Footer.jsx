import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10">
      <div className="container mx-auto text-center space-y-6">
        {/* Logo or Title */}
        <h1 className="text-2xl font-bold tracking-wide">The Daily Scroll</h1>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="/about"
            className="text-sm hover:text-indigo-400 transition-colors duration-300"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-sm hover:text-indigo-400 transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="text-sm hover:text-indigo-400 transition-colors duration-300"
          >
            Privacy Policy
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            className="text-lg hover:text-indigo-400 transition-colors duration-300"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            className="text-lg hover:text-indigo-400 transition-colors duration-300"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            className="text-lg hover:text-indigo-400 transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Copyright Information */}
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} TDS | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
