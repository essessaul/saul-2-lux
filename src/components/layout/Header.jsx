import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [shrunk, setShrunk] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { session, profile } = useAuth();

  useEffect(() => {
    function onScroll() {
      setShrunk(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const role = profile?.role || session?.user?.user_metadata?.role || "guest";

  return (
    <header className={`site-header luxury-header ${shrunk ? "is-shrunk" : ""}`}>
      <div className="container luxury-header-shell">
        <div className="luxury-header-left">
          <Link to="/" className="luxury-logo-wrap">
            <img src={logo} alt="Playa Escondida" className="logo luxury-logo" />
          </Link>
        </div>

        <div className="luxury-header-center">
          <nav className="nav-links luxury-nav luxury-nav-centered">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/listings">VACATION RENTALS</NavLink>
            <NavLink to="/our-listings">OUR LISTINGS</NavLink>
            <NavLink to="/login">LOG IN / SIGN UP</NavLink>
            <NavLink to="/about">ABOUT US</NavLink>
            <NavLink to="/contact">CONTACT</NavLink>
          </nav>
        </div>

        <div className="luxury-header-right">
          <div className="header-actions luxury-header-actions">
            <a href="tel:+50766164212" className="icon-btn" aria-label="Call">📞</a>
            <a href="mailto:saul@playa.com" className="icon-btn" aria-label="Email">✉️</a>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>

          <div className="header-mini-row">
            {(role === "owner" || role === "admin") ? (
              <Link to="/owner-portal" className="header-mini-btn header-owner-btn">OWNER</Link>
            ) : null}
            {session ? (
              <Link to="/admin" className="header-mini-btn header-admin-btn">ADMIN</Link>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
