import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Verifyemail from './pages/Verifyemail'
import Resetpassword from './pages/Resetpassword'
import { ToastContainer} from 'react-toastify';
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<Verifyemail/>}/>
        <Route path='/reset-password' element={<Resetpassword/>}/>
      </Routes>
    </div>
  )
}

export default App
