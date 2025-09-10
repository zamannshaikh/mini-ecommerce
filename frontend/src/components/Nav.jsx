import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Nav.css"; // Assuming you have a CSS file for styling

const Nav = ({ user, cartCount }) => {
  return (
    <nav className="navbar">
      {/* Left side */}
      <div className="nav-left">
        <span className="greeting">
          {user ? `Hello, ${user}` : "Welcome, Guest"}
        </span>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/products" className="nav-link">
          Products
        </NavLink>
      </div>

      {/* Right side */}
      <div className="nav-right">
        <NavLink to="/login" className="login-btn">
          <i className="ri-login-circle-line"></i>
          {user ? " Logout" : " Login"}
        </NavLink>
        <NavLink to="/cart" className="cart-icon">
          <i className="ri-shopping-cart-line"></i>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
