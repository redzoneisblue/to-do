import express from 'express'
const router = express.Router();
import Task from '../models/Task.js'

// Remove a task by ID
router.delete("/removeTask/:id", async (req, res) => {
    try {
        const removedTask = await Task.findByIdAndDelete(req.params.id);
        if (!removedTask) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json({ msg: "Task successfully removed", task: removedTask });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Unable to remove Task" });
    }
});

export default router;