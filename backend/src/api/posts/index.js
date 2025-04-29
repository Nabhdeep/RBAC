import { Router } from "express";
import {middleware as body} from "bodymen"
import { addPost, getPosts , getPost , changePost , deletePost } from "./contoller";
import { tokenMiddleware } from "../../services/middleware";


const router = new Router();

router.post('/' , tokenMiddleware,addPost)
router.get('/',tokenMiddleware , getPosts)
router.get('/:id',tokenMiddleware , getPost)
router.put('/:id',tokenMiddleware,changePost)
router.delete('/:id',tokenMiddleware,deletePost)

export default router