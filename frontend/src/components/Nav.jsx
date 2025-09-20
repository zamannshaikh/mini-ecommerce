import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Nav.css"; // Assuming you have a CSS file for styling
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutUser } from "../services/userService";

const Nav = () => {
  const userLogin= useSelector((state)=> state.userReducer.data);
 
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const logoutHandler=()=>{
    dispatch(asyncLogoutUser());
    navigate("/");
  }
  console.log("Navbar userLogin:", userLogin);
console.log("Type of isAdmin:", typeof userLogin?.isAdmin, "Value:", userLogin?.isAdmin);



  return (
    <nav className="navbar">
      {/* Left side */}
      <div className="nav-left">
        <span className="greeting">
          {userLogin ? `Hello, ${userLogin.username}` : "Welcome, Guest"}
        </span>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink to="/products" className="nav-link">
          Products
        </NavLink>

        {userLogin && userLogin.isAdmin ?
        
        <>
        <NavLink to="/admin/create-product" className="nav-link">
           Create Products
        </NavLink>
        </>
        :<></>}

        
        
        
      </div>

      {/* Right side */}
      <div className="nav-right">


        
     {userLogin ? (
  <>
    <button className="login-btn" onClick={logoutHandler}>
      <i className="ri-login-circle-line"></i> Logout
    </button>

    <button className="profile-btn" onClick={() => navigate("/profile")}>
      <i className="ri-user-3-line"></i>
    </button>

    <NavLink to="/cart" className="cart-icon">
      <i className="ri-shopping-cart-line"></i>
      {/* {cartCount > 0 && <span className="cart-count">{cartCount}</span>} */}
    </NavLink>
  </>
) : (
  <NavLink to="/login" className="login-btn">
    <i className="ri-login-circle-line"></i> Login
  </NavLink>
)}




      </div>
    </nav>
  );
};

export default Nav;
