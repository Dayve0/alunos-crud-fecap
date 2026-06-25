import studentsController from "@/controllers/students.controller.js";
import { Router } from "express";

const route = Router()

route.get('/', studentsController.getStudents)
route.get('/:id', studentsController.getStudent)
route.post('/', studentsController.createStudent)
route.put('/:id', studentsController.updateStudent)
route.delete('/:id', studentsController.deleteStudent)

export default route;