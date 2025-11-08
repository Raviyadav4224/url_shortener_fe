import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./AuthPage.css";
import Loader from "@components/Loader";

import { useLoginMutation, useRegisterMutation } from "./authApi";
import { setCredentials } from "./authSlice";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [register] = useRegisterMutation();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = null;
      if (isLogin) {
        const result = await login(form).unwrap();
        token = result?.data?.accessToken;
        toast.success("Login successful");
      } else {
        const result = await register(form).unwrap();
        token = result?.data?.accessToken;
        toast.success("Registered successfully");
      }
      dispatch(setCredentials({ token: token }));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.data?.password || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {isLoading && <Loader />}
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your user name"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="link-btn">
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
