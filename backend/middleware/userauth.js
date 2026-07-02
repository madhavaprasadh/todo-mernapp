import jwt from 'jsonwebtoken'

const userauth = async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return res.json({success:false,message:'not authorized login again'})
    }
    try{
        const decodetoken=jwt.verify(token,process.env.JWT_SECRET)
        if(decodetoken.id){
            req.userId=decodetoken.id
        }
        else{
            return res.json({success:false,message:'not authorize dlogin again'})
        }
        next()
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}
export default userauth

