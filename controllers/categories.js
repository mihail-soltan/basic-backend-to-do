import Category from "../models/category.js";

// CRUD ops

//GET

export async function getCategories(request, response) {
    try {
        const tasks = await Category.find();
        response.status(200).json(tasks);
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}
export async function getCategoryById(request, response) {
    try {
        const tasks = await Category.findById(request.params.id);
        response.status(200).json(tasks);
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}


//POST 
export async function postCategory(request, response) {
    try {
        const task = new Category({ ...request.body, created_at: new Date() })
        const newCategory = await task.save()
        response.status(200).json(newCategory)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}


//PUT
export async function updateCategory(request, response) {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(request.params.id, { ...request.body, updated_at: new Date(), edited: true }, { new: true })
        response.json(updatedCategory)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

//DELETE
export async function deleteCategory(request, response) {
    try {
        const deletedCategory = await Category.findByIdAndDelete(request.params.id)
        response.json(deletedCategory)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}