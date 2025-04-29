import jwt from 'jsonwebtoken'
import {jwt_key} from '../../config'


export const createToken = (user_id)=>{
    const timestamp = Date.now()
    return jwt.sign({'data':`${user_id}` , 'iat':timestamp , 'exp':timestamp+500000} , jwt_key)
}

export const verifyToken = (token)=>{
    try {
        return jwt.verify(token , jwt_key , function (err  ,decoded){
            if (err){
                throw ('invalid token')
            }
            return decoded
        })   
    } catch (error) {
        throw error
    }
}