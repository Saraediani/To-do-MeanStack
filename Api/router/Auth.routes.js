import express from "express";
// import {verifyToken} from "../middleware/auth.js";
import { register , login } from "../controllers/AuthCont.js";
const userRouter = express.Router()

userRouter.route('/register').post(register)
userRouter.route('/login').post(login)


export default userRouter