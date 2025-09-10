import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import PasswordInput from "../components/PasswordInput";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../services/userService";

const Register = () => {
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // console.log("Register Data:", data);
    reset();
    dispatch(asyncRegisterUser(data));
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account ✨</h2>
        <p className="auth-subtitle">Join us and start shopping smarter</p>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder="Username"
            className="auth-input"
          />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="auth-input"
          />
          <PasswordInput register={register} />

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
