import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    status: {type: String, enum: ["finished", "pending", "in_progress"]},
    created_at: { type: Date },
    created_by: { type: mongoose.Schema.Types.Mixed },
    updated_at: { type: Date },
    updated_by: { type: mongoose.Schema.Types.Mixed },
    edited: { type: Boolean }
})

const Task = mongoose.model("Task", taskSchema);
export default Task