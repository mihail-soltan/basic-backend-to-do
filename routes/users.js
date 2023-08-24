import { Router } from "express";
import { signUp, signin, assignTask } from "../controllers/users.js";

const userRouter = Router()

userRouter.route("/signup")
    .post(signUp)

userRouter.route("/signin")
    .post(signin)

userRouter.route("/assign-task/:taskId/:userId")
    .put(assignTask)

export default userRouter