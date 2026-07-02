import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verifyotp:{type:String,default:''},
    verifyotp_expireat:{type:Number,default:0},
    isaccountverified:{type:Boolean,default:false},
    resetotp:{type:String,default:''},
    resetotp_expireat:{type:Number,default:0},
})

const usermodel=mongoose.models.user || mongoose.model('user',userschema)
export default usermodel

const user=new usermodel({name,password,email})
user.save()
