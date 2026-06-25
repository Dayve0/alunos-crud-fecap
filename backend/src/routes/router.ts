import { Router } from "express";
import studentsRoute from '@/routes/students.route.js'

const route = Router()

route.use('/students', studentsRoute)

export default route;