import { successResponse } from "../../services/responses"
import { UserModel } from "../auth/model"

export const getUser = (req , res)=>{
    successResponse(200 , req.user , res)
}