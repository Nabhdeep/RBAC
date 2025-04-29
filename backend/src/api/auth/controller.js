import bcrypt from "bcryptjs";
import { UserModel } from "./model";
import { createToken } from "../../services/jwt";
import { errorResponse, successResponse } from "../../services/responses";
export const home = (req , res)=>{
    const {email , name , password} = req.body
    return bcrypt.hash(password, 10)
    .then((_hashPwd)=>{
        return UserModel.create({
            "email":email,
            "name":name , 
            "pwd_hash":_hashPwd
        })
    }).then((_user)=>{
        const _token = createToken(_user._id)
      successResponse(200 , {success:true , token:_token , "user":{"email":_user.email , "name":_user.name , "role":_user.role}},res)
    })
    .catch((err)=>{
        console.error("Error in /home:", err);
        errorResponse(500, "Something went wrong. Please try again.", res);
    })
    
}


export const login = (req , res)=>{
    const user = req.user
    const {email , password} = req.body
    return bcrypt.compare(password , user.pwd_hash)
    .then((isMatch)=>{
        if(!isMatch) throw {status:401,message:"wrong password"}
        const _token = createToken(user.id)
        successResponse(200 , {success:true ,  token:_token , "user":{"email":user.email , "name":user.name , "role":user.role}},res)
    })
    .catch((err)=>{
        console.error("Error in /login:", err);
        errorResponse(err?.status||500, err?.message || "Something went wrong. Please try again.", res);
    })
}