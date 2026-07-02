import { useEffect, useState } from "react";
import React from "react";
import { createContext } from "react";
import { toast } from 'react-toastify'
export const Appcontext=createContext()
import axios from "axios";

export const Appcontextprovider=(props)=>{
    const backendurl=import.meta.env.VITE_BACKEND_URL
    axios.defaults.withCredentials = true;
    const getUserdata=async ()=>{
        try{
            const {data}=await axios.post('http://localhost:4000/api/user/get-userdata')
            data.success ? setuserdata(data.userdata):toast.error(data.message)
        }
        catch(error){
            toast.error(error.message)
        }
    }   
    const getauth=async ()=>{
        try{
            const {data}= await axios.get('http://localhost:4000/api/auth/is-auth')
            if(data.success){
                setisloggedin(true)
                getUserdata()
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getauth()
    },[])
    const[isloggedin,setisloggedin]=useState(false)
    const[userdata,setuserdata]=useState(false)
    const value={
        backendurl,isloggedin,setisloggedin,userdata,setuserdata,getUserdata
    }
    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}