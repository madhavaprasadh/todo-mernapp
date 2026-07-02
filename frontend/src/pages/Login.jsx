import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Appcontext } from '../context/Appcontext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const navigate=useNavigate()
  const {backendurl,setisloggedin,getUserdata}=useContext(Appcontext)
  const [state,setstate]=useState('sign up')
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')

axios.defaults.withCredentials = true; 

const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
        if (state === 'sign up') {
            const { data } = await axios.post(
                'http://localhost:4000/api/auth/register',
                { name, email, password }
            );
            if (data.success) {
                setisloggedin(true);
                await getUserdata();
                navigate('/');
                toast.success("Account created successfully!"); 
            } else {
                toast.error(data.message);
            }

        } else {
            const { data } = await axios.post(
                'http://localhost:4000/api/auth/login', 
                { email, password }
            );
            if (data.success) {
                setisloggedin(true);
                await getUserdata();
                navigate('/');
                toast.success("Logged in successfully!"); 
            } else {
                toast.error(data.message);
            }
        }

    } catch (error) {
        toast.error(error.message);
        console.log(error);
    }
}

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='absolute left-4 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 '>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state==='sign up'? 'Create account':'Login'}</h2>
        <p className='text-center mb-3'>{state==='sign up'? 'Create your account':'Login to your account'}</p>
        <form action="" onSubmit={onsubmithandler}>
          {state==='sign up' ?
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.person_icon} alt="" />
            <input onChange={(e)=>setname(e.target.value)} value={name} className='outline-none bg-transparent' type='text' placeholder='Full Name' required/>
          </div>:<></>
          }
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input onChange={(e)=>setemail(e.target.value)} value={email} className='outline-none bg-transparent' type='text' placeholder='Email id' required/>
          </div>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={(e)=>setpassword(e.target.value)} value={password} className='outline-none bg-transparent' type='password' placeholder='Password' required/>
          </div>
          <p onClick={()=>navigate('/reset-password')} className='mb-4 cursor-pointer text-indigo-300'>Forgot password?</p>
          <button className='w-full py-2.5 rounded-full bg-indigo-500 text-white font-medium'>{state}</button>
        </form>
        {state==='sign up' ?
        <p className='text-gray-400 text-center text-xs mt-4'>Already have an account? <span onClick={()=>setstate('login')} className='text-blue-400 cursor-pointer underline'>Login Here</span></p>
        :<p className='text-gray-400 text-center text-xs mt-4'>Don't have an account? <span onClick={()=>setstate('sign up')} className='text-blue-400 cursor-pointer underline'>Sign up</span></p>
        }
      </div>
    </div>
  )
}

export default Login