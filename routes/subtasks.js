import { Router } from "express";
import {
    getSubTasksByParentTaskId,
    getSubtasks,
    getSubtasksByStatus,
    getSubtasksByCategory,
    getSubtaskById,
    postSubtask,
    updateSubtask,
    deleteSubtask
}
    from "../controllers/subtasks.js";

const subtaskRouter = Router()

subtaskRouter.route("/")
    .get(getSubtasks)

subtaskRouter.route("/add/:parentId")
    .post(postSubtask)

subtaskRouter.route("/:id")
    .put(updateSubtask)
    .delete(deleteSubtask)

subtaskRouter.route("/parent/:parentId")
    .get(getSubTasksByParentTaskId)


export default subtaskRouter