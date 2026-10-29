import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const { userdata, setuserdata, setisloggedin } = useContext(Appcontext);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        "http://localhost:4000/api/auth/logout",
      );

      if (data.success) {
        setisloggedin(false);
        setuserdata(false);
      }

      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt="Logo" className="navbar-logo" />

      {userdata ? (
        <div className="navbar-profile">
          {userdata.name[0].toUpperCase()}

          <div className="navbar-dropdown">
            <ul className="navbar-menu">
              <li onClick={logout} className="navbar-menu-item navbar-logout">
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button onClick={() => navigate("/login")} className="navbar-login">
          Login
          <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
