import Task from "../models/Task.model.js";

const  tasksController = {
    getTasks: async (req, res) => {
        try {
            const tasks = await Task.find()
            res.json(tasks)
        } catch (error) {
            res.json({ error: error.message })
        }
    },
    getTask: async (req, res) => {
        try {
            const tasks = await Task.findById(req.params.id)
            res.json(tasks)
        } catch (error) {
            res.json({ error: error.message })
        }
    },
    addTask: async (req, res) => {
        try {
            const task = await Task.create({
                title: req.body.title,
            })
            res.json(task)
        } catch (error) {
            res.json({ error: error.message })
        }
    },
    editTask: async (req, res) => {
        try {
            const task = await Task.findByIdAndUpdate(
                req.params.id,
                { completed: req.body.completed },
                { new: true })
            res.json(task)



        } catch (error) {
            res.json({ error: error.message })
        }
    },
    removeTask: async (req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params.id)
            res.json(task)
        } catch (error) {
            res.json({ error: error.message })
        }
    }
}
export default  tasksController