import React, { useState } from "react";
import "../styles/Auth.css"; // Ensure the styles are imported

const PasswordInput = ({ register }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-wrapper">
      <input
        {...register("password", { required: true })}
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="auth-input"
      />
      <i
        className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}
        onClick={() => setShowPassword(!showPassword)}
      ></i>
    </div>
  );
};

export default PasswordInput;
