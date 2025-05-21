import express from 'express'
const router = express.Router();
import Task from '../models/Task.js'


router.post("/addTask", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        console.log(savedTask);
        res.status(201).json({ msg: "Task successfully created", task: savedTask });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Unable to create a new Task" });
    }
})

router.patch("/task/:id/status", async (req, res) => {
    try {
        const { notestatus } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { notestatus },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json({ msg: "Status updated", task: updatedTask });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Unable to update status" });
    }
});

export default router;