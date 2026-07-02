import express from 'express'
import { register,login,logout, sendverifyotp, verifyemail, isauthenticated, sendresetotp, resetpassword } from '../controllers/authcontroller.js'
import userauth from '../middleware/userauth.js'

const authrouter=express.Router()

authrouter.post('/register',register)
authrouter.post('/login',login)
authrouter.post('/logout',logout)
authrouter.post('/send-verify-otp',userauth,sendverifyotp)
authrouter.post('/verify-account',userauth,verifyemail)
authrouter.get('/is-auth',userauth,isauthenticated)
authrouter.post('/send-resetotp',sendresetotp)
authrouter.post('/reset-password',resetpassword)

export default authrouter

