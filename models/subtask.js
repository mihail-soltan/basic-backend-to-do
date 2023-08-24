import mongoose from 'mongoose';

const subTaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    status: { type: String, enum: ["finished", "pending", "in_progress"] },
    created_at: { type: Date },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_at: { type: Date },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    responsible_user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    edited: { type: Boolean },
    parent_task_id: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }
})

const Subtask = mongoose.model("Subtask", subTaskSchema);
export default Subtask