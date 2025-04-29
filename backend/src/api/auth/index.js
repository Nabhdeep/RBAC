import { Router } from "express";
import { home, login } from "./controller";
import {middleware as body} from "bodymen"
import { checkUserAlreadyExist, findUserMiddleware } from "../../services/middleware";
const router = new Router();

router.post('/register' , body({
    email:{type:String , required:true},
    name:{type:String , required:true},
    password:{type:String , required:true},
}),checkUserAlreadyExist , home)

router.post('/login' , body({
    email:{type:String , required:true},
    password:{type:String , required:true},
}),findUserMiddleware , login)

export default router