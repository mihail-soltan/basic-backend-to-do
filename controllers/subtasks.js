import jsonwebtoken from 'jsonwebtoken';
import Subtask from '../models/subtask.js';
import Task from '../models/task.js';

export async function getSubtasks(request, response) {
    try {
        const subtask = await Subtask.find().populate("categories")
        response.status(200).json(subtask);
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

export async function getSubTasksByParentTaskId(req, res) {
    try {
        const subtask = await Subtask.find({ parent_task_id: req.params.parentId })
        res.status(200).json(subtask)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

export async function getSubtasksByCategory(request, response) {
    try {
        const categoryId = request.params.category
        const subtask = await Subtask.find({ categories: { $in: [categoryId] } }).populate("categories")
        response.status(200).json(subtask)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

export async function getSubtasksByStatus(request, response) {
    try {
        const status = request.params.status
        const subtask = await Subtask.find({ status }).populate("categories")
        response.status(200).json(subtask)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

export async function getSubtaskById(request, response) {
    try {
        const subtask = await Subtask.findById(request.params.id);
        response.status(200).json(subtask);
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

//POST 
export async function postSubtask(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        response.status(401).json({ message: "Please log in to create a new subtask" })
    }


    jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            response.status(401).json({ message: err.message })
        }
        request.user = user
        // console.log(request.user)
        const subtask = new Subtask({ ...request.body, created_at: new Date(), created_by: request.user.id, status: "pending", parent_task_id: request.params.parentId })
        const newSubtask = await subtask.save()
        const updatedParentTask = await Task.findById(request.params.parentId)
        updatedParentTask.subtasks = updatedParentTask.subtasks + 1;
        await updatedParentTask.save()
        response.status(200).json(newSubtask)
    })

}


//PUT
export async function updateSubtask(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        response.status(401).json({ message: "Please log in to create a new subtask" })
    }

    try {
        jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if (err) {
                response.status(401).json({ message: err.message })
            }
            request.user = user
            const updatedSubtask = await Subtask.findByIdAndUpdate(request.params.id,
                { ...request.body, updated_at: new Date(), updated_by: request.user.id, edited: true },
                { new: true })

            response.json(updatedSubtask)
        })
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

//DELETE
export async function deleteSubtask(request, response) {
    try {
        const deletedSubtask = await Subtask.findByIdAndDelete(request.params.id)
        response.json(deletedSubtask)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}