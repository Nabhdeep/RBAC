import { UserModel } from "../../api/auth/model"
import { verifyToken } from "../jwt"
import { errorResponse } from "../responses"

export const findUserMiddleware =async (req , res , next)=>{
    try {
        const user = await UserModel.findOne({email:req?.body?.email})
        if(user){
            req.user = user
            next()
        }else{
            return errorResponse(401 , "User does not exist" , res)
        }
    } catch (error) {
        return errorResponse(500 , "someting went wront" , res)
    }
    
}

export const checkUserAlreadyExist = async (req , res , next)=>{
    try {
        const user = await UserModel.findOne({email:req?.body?.email})
        if(user){
            return errorResponse(401 , "User already exist" , res)
        }
        next()
    } catch (error) {
        console.log(error);
        return errorResponse(500 , "someting went wront" , res)
    }
    
}

export const tokenMiddleware = async (req , res , next)=>{
    try {
        let _error = {'type':'tokenError','message':''}
        if(!req?.headers?.authorization){
            _error.message = "token missing"
            throw _error
        }
        const token = req?.headers?.authorization.split('Bearer ')
        if (!token){ 
            _error.message = "invalid token"
            throw _error
        }
        const _r = verifyToken(token[1])
        const user = await UserModel.findById(_r.data)
        if(!user) {
            _error.message = 'user missing/invalid user'
            throw _error
        }
        req.user = user
        next()
    } catch (error) {
        if(error?.type == 'tokenError'){
            return errorResponse(401 , error.message , res)
        }
        console.error("Token middleware error:", error);
        return errorResponse(500 , 'something went wrong' , res)
    }
}