import usermodel from "../models/usermodel.js";
export const getuserdata= async (req,res)=>{
    try{
        const userId=req.userId
        const user=await usermodel.findById(userId)
        if(!user){
            return res.json({success:false,message:'user not found'})
        }
        res.json({success:true,
            userdata:{
                name:user.name,
                isaccountverified:user.isaccountverified
            }
        })
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}

