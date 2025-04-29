import { Router } from "express";
import auth from './auth'
import posts from './posts'
import user from './user'

const router = new Router();
const prefix = "/api/v1"


router.use(`${prefix}/auth` , auth)
router.use(`${prefix}/posts` , posts)
router.use(`${prefix}/user` , user)
export default router