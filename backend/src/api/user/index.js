import { Router } from "express";
import {middleware as body} from "bodymen"
import { getUser} from "./controller";
import { tokenMiddleware } from "../../services/middleware";


const router = new Router();

router.get('/profile' , tokenMiddleware,getUser)
export default router