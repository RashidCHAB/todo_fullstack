import { Router } from "express";
import TasksRoutes from './Tasks.routes.js'
const router = Router()

router.use('/', TasksRoutes)

export default router