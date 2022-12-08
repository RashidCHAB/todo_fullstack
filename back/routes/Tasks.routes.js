import { Router } from "express";
import TasksController from '../controllers/Tasks.controller.js'
const router = Router()

router.get('/tasks', TasksController.getTasks)
router.get('/task/:id', TasksController.getTask)
router.post('/task', TasksController.addTask)
router.patch('/task/:id', TasksController.editTask)
router.delete('/task/:id', TasksController.removeTask)

export default router