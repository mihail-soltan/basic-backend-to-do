import Task from "../models/task.js";

// CRUD ops

//GET

export async function getTasks(request, response) {
    try {
        const tasks = await Task.find().populate("categories");
        response.status(200).json(tasks);
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

export async function getTasksByCategory(request, response) {
    try {
        const categoryId = request.params.category
        const tasks = await Task.find({ categories: { $in: [categoryId] } }).populate("categories")
        response.status(200).json(tasks)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

export async function getTasksByStatus(request, response) {
    try {
        const status = request.params.status
        const tasks = await Task.find({ status }).populate("categories")
        response.status(200).json(tasks)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

export async function getTaskById(request, response) {
    try {
        const tasks = await Task.findById(request.params.id);
        response.status(200).json(tasks);
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

//POST 
export async function postTask(request, response) {
    try {
        const task = new Task({ ...request.body, created_at: new Date() })
        const newTask = await task.save()
        response.status(200).json(newTask)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}


//PUT
export async function updateTask(request, response) {
    try {
        const updatedTask = await Task.findByIdAndUpdate(request.params.id,
            { ...request.body, updated_at: new Date(), edited: true },
            { new: true })

        response.json(updatedTask)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

//DELETE
export async function deleteTask(request, response) {
    try {
        const deletedTask = await Task.findByIdAndDelete(request.params.id)
        response.json(deletedTask)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}