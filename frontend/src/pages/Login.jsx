import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../context/Appcontext";
import { toast } from "react-toastify";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const { setisloggedin, getUserdata } = useContext(Appcontext);
  const backendurl = "http://localhost:4000";

  const [state, setstate] = useState("sign up");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  axios.defaults.withCredentials = true;

  const onsubmithandler = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        state === "sign up" ? "/api/auth/register" : "/api/auth/login";

      const payload =
        state === "sign up" ? { name, email, password } : { email, password };

      const { data } = await axios.post(`${backendurl}${endpoint}`, payload);

      if (data.success) {
        await getUserdata();
        navigate("/");
        toast.success(
          state === "sign up"
            ? "Account created successfully!"
            : "Logged in successfully!",
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="login-logo"
      />

      <div className="login-card">
        <h2 className="login-title">
          {state === "sign up" ? "Create account" : "Login"}
        </h2>

        <p className="login-subtitle">
          {state === "sign up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <form onSubmit={onsubmithandler}>
          {state === "sign up" && (
            <div className="login-input-group">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setname(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="login-input-group">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email id"
              autoComplete="email"
              required
            />
          </div>

          <div className="login-input-group">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              autoComplete={
                state === "sign up" ? "new-password" : "current-password"
              }
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="login-forgot"
          >
            Forgot password?
          </p>

          <button type="submit" className="login-submit">
            {state}
          </button>
        </form>

        {state === "sign up" ? (
          <p className="login-switch">
            Already have an account?{" "}
            <span onClick={() => setstate("login")}>Login Here</span>
          </p>
        ) : (
          <p className="login-switch">
            Don't have an account?{" "}
            <span onClick={() => setstate("sign up")}>Sign up</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
