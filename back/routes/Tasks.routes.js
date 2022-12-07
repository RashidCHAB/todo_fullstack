import { Router } from "express";
import TasksController from '../controllers/Tasks.controller.js'
const router = Router()

router.get('/', TasksController.getTasks)
router.get('/:id', TasksController.getTask)
router.post('/', TasksController.addTask)
router.patch('/:id', TasksController.editTask)
router.delete('/:id', TasksController.removeTask)

export default router