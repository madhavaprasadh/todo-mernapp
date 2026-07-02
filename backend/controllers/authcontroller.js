import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import usermodel from '../models/usermodel.js'
import transporter from '../config/nodemailer.js'
export const register= async (req,res)=>{
    const {name,email,password}=req.body
    if(!name || !email || !password){
        return res.json({success:false,message:'missing details'})
    }
    try{
        const existinguser=await usermodel.findOne({email})
        if (existinguser){
            return res.json({success:false,message:'user already exists'})
        }
        const hashedpassword= await bcrypt.hash(password,10)
        const user=new usermodel({name,email,password:hashedpassword})
        await user.save()

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            maxage: 7*24*60*60*1000
        })

        const mailoptions={
            from : process.env.SENDER_EMAIL,
            to:email,
            subject:'Welcome sir',
            text:`Welcome to our website your account has been createed with the email id :${email} `
        }
        await transporter.sendMail(mailoptions)

        return res.json({success:true})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}
export const login = async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.json({success:false,message:"email and password are required"})
    }
    try{
        const user= await usermodel.findOne({email})
        if(!user){
            return res.json({success:false,message:"invalid email"})
        }
        const ismatch= await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.json({success:false,message:'password is incorrect'})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            maxage: 7*24*60*60*1000
        })

        return res.json({success:true})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}
export const logout = async (req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
        })
        return res.json({success:true,message:"Logged out"})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}
export const sendverifyotp = async (req,res)=>{
    try{
        const userId=req.userId
        const user= await usermodel.findById(userId)
        if (user.isaccountverified){
            return res.json({success:false,message:"account already verified"})
        }
        let otp = String(Math.floor(100000 + Math.random()*900000))
        user.verifyotp=otp
        user.verifyotp_expireat=Date.now()+24*60*60*1000
        await user.save()
        const mailoptions={
            from : process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Account verification otp',
            text:`your verification otp is ${otp}`
        }
        await transporter.sendMail(mailoptions)
        res.json({success:true,message:'verification otp sent to the email'})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export const verifyemail = async (req,res)=>{
    const {userId,otp}=req.body
    if(!userId || !otp){
        return res.json({success:false,message:'missing details'})
    }
    try{
        const user=await usermodel.findById(userId)
        const user=await usermodel.findByIdAndUpdate(userId,{
            creditbalance:credits
        },{new:true})
        if(!user){
            return res.json({success:false,message:'user not found'})
        }
        if(user.verifyotp==='' || user.verifyotp !== otp){
            return res.json({success:false,message:'invalid otp'})
        }
        if (user.verifyotp_expireat < Date.now()){
            return res.json({success:false,message:'otp expired'})
        }
        user.isaccountverified=true
        user.verifyotp=''
        user.verifyotp_expireat=0
        user.save()
        return res.json({success:true,message:'email verified successfully'})
    }   
    catch(error){
        return res.json({success:false,message:error.message})
    }
}

export const isauthenticated = async(req,res)=>{
    try{
        return res.json({success:true})
    }
    catch(error){
        res.json({success:true,message:error.message})
    }
}

export const sendresetotp = async(req,res)=>{
    const {email}=req.body
    if(!email){
        return res.json({success:false,message:'email is required'})
    }
    try{
        const user=await usermodel.findOne({email})
        if(!user){
            return res.json({success:false,message:'account doesnt exist'})
        }
        let otp = String(Math.floor(100000 + Math.random()*900000))
        user.resetotp=otp
        user.resetotp_expireat=Date.now()+24*60*60*1000
        await user.save()
        const mailoptions={
            from : process.env.SENDER_EMAIL,
            to:user.email,
            subject:'password reset otp',
            text:`your reset otp is ${otp}`
        }
        await transporter.sendMail(mailoptions)
        res.json({success:true,message:'reset otp sent to the email'})

    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}

export const resetpassword= async (req,res)=>{
    const {email,otp,newpassword}=req.body
    if (!email || !otp || !newpassword){
        return res.json({success:false,message:'missing details'})
    }
    try{
        const user= await usermodel.findOne({email})
        if(!user){
            return res.json({success:false,message:'account doesnt exist'})
        }
        if(user.resetotp==='' || user.resetotp !== otp){
            return res.json({success:false,message:"invalid otp"})
        }
        if(user.resetotp_expireat<Date.now()){
            return res.json({success:false,message:"invalid otp"})
        }
        const hashedpassword= await bcrypt.hash(newpassword,10)
        user.password=hashedpassword
        user.resetotp=''
        user.resetotp_expireat=0
        await user.save()
        return res.json({success:true,message:'password changed successfully'})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}