import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import "../styles/Auth.css";
import PasswordInput from "../components/PasswordInput"; // Import the PasswordInput component
import { asyncLoginUser } from "../services/userService";
import { useDispatch } from "react-redux";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("Login Data:", data.username ,data.password);
    dispatch(asyncLoginUser(data));
    reset();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to continue shopping</p>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder="Username"
            className="auth-input"
          />
        <PasswordInput register={register} />

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-footer">
          New here? <NavLink to="/register">Create an account</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
