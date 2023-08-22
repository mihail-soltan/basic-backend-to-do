import { Router } from "express";
import { getTasks, getTaskById, postTask, updateTask, deleteTask, getTasksByStatus, getTasksByCategory } from "../controllers/tasks.js";
import { get } from "mongoose";

const taskRouter = Router();

taskRouter.route("/")
    .get(getTasks)
    .post(postTask)

taskRouter.route("/:id")
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask)

taskRouter.route("/status/:status")
    .get(getTasksByStatus)

taskRouter.route("/category/:category")
    .get(getTasksByCategory)

export default taskRouter