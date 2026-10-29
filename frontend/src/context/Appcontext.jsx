import { useEffect, useState } from "react";
import React from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
export const Appcontext = createContext();
import axios from "axios";

export const Appcontextprovider = (props) => {
  axios.defaults.withCredentials = true;
  const getUserdata = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/get-userdata",
      );
      data.success ? setuserdata(data.userdata) : console.error(data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  const [userdata, setuserdata] = useState(false);
  const value = {
    userdata,
    setuserdata,
    getUserdata,
  };
  return (
    <Appcontext.Provider value={value}>{props.children}</Appcontext.Provider>
  );
};
