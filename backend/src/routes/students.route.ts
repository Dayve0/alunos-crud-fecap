// Aqui ficam as rotas relacionadas aos alunos

import studentsController from "@/controllers/students.controller.js";
import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";

const route = Router()

// Buscar todos os alunos
route.get('/', authMiddleware("ADMIN"), studentsController.getStudents)

// Buscar um aluno pelo ID
route.get('/:id', authMiddleware("ADMIN"), studentsController.getStudent)

// Criar um novo aluno
route.post('/', authMiddleware("ADMIN"), studentsController.createStudent)

// Atualizar um aluno
route.patch('/:id', authMiddleware("ADMIN"), studentsController.updateStudent)

// Atualizar um aluno
route.get('/activate/:id', authMiddleware("ADMIN"), studentsController.activateStudent)

// Deletar/Desativar um aluno
route.delete('/:id', authMiddleware("ADMIN"), studentsController.deleteStudent)

export default route;