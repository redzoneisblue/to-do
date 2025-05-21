import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    notename: {
        type: String,
        required: true,
        trim: true,
        default: "New Task",
    },
    notestatus: {
        type: String,
        required: true,
        default: "unchecked"
    }
}, { collection: "Tasks" })

const Task = mongoose.model("Task", taskSchema);

export default Task;