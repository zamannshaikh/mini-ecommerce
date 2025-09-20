import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Default.css";

const Default = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Page Not Found</h2>
      <p className="notfound-text">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <button className="notfound-btn" onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
};

export default Default;
