import express from 'express'
import userauth from '../middleware/userauth.js'
import { getuserdata } from '../controllers/usercontroller.js'
const userrouter=express.Router()

userrouter.post('/get-userdata',userauth,getuserdata)
export default userrouter
