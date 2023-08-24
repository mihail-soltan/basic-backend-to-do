import Task from "../models/task.js";
import jsonwebtoken from 'jsonwebtoken';
// CRUD ops

//GET

export async function getTasks(request, response) {
    try {
        const tasks = await Task.find().populate("categories")
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
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        response.status(401).json({ message: "Please log in to create a new task" })
    }


    jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            response.status(401).json({ message: err.message })
        }
        request.user = user
        // console.log(request.user)
        const task = new Task({ ...request.body, created_at: new Date(), created_by: request.user.id, status: "pending" })
        const newTask = await task.save()
        response.status(200).json(newTask)
    })

}

// for authenticated users who want to see tasks creaeted by them
export const getTasksByUserId = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Please log in to create a new task" })
    }

    jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            res.status(401).json({ message: err.message })
        }
        req.user = user
        const tasks = Task.find({ created_by: req.user.id })
        res.status(200).json(tasks)
    })
}

// for authenticated users who want to see tasks assigned to them

export const getTasksByResponsibleUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Please log in to create a new task" })
    }

    jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            res.status(401).json({ message: err.message })
        }
        req.user = user
        const tasks = Task.find({ responsible_user: req.user.id })
        res.status(200).json(tasks)
    })
}

//PUT
export async function updateTask(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        response.status(401).json({ message: "Please log in to create a new task" })
    }

    try {
        jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if (err) {
                response.status(401).json({ message: err.message })
            }
            request.user = user
            const updatedTask = await Task.findByIdAndUpdate(request.params.id,
                { ...request.body, updated_at: new Date(), updated_by: request.user.id, edited: true },
                { new: true })

            response.json(updatedTask)
        })
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