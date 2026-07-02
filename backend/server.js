import express from "express";
import cors from "cors";
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from "./config/Mongodb.js";
import authrouter from "./userRoutes/Authroutes.js"
import userrouter from "./userRoutes/Userroutes.js";
import mongoose from "mongoose";

const app=express()
const PORT=process.env.PORT || 4000
connectDB()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.get('/',(req,res)=> res.send("API Working"))
app.use('/api/auth',authrouter)
app.use('/api/user',userrouter)
app.listen(PORT,()=> console.log(`server started on PORT:${PORT}`))
