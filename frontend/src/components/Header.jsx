import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Appcontext } from "../context/Appcontext";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userdata } = useContext(Appcontext);
  const navigate = useNavigate();
  return (
    <div className="header">
      <img src={assets.header_img} alt="Profile" className="header-image" />

      <h1 className="header-greeting">
        Hey {userdata ? userdata.name : "Developer"}
        <img className="header-wave" src={assets.hand_wave} alt="Waving hand" />
      </h1>

      <h2 className="header-title">Welcome to our app</h2>

      <p className="header-description">Lets make your day productive</p>

      {userdata ? (
        <button className="header-button" onClick={() => navigate("/todos")}>
          Get started
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
