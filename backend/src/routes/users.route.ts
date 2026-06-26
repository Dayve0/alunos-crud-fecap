// Aqui ficam as rotas relacionadas aos usuários

import usersController from "@/controllers/users.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";

const route = Router()

// Buscar todos os usuários
route.get('/', usersController.getUsers)

// Buscar um usuário pelo ID
route.get('/:id', authMiddleware("ADMIN"), usersController.getUser)

// Criar um novo usuário
route.post('/', authMiddleware("ADMIN"), usersController.createUser)

// Alterar a senha
route.post('/', authMiddleware("ADMIN"), usersController.resetPassword)

// Atualizar um usuário
route.patch('/:id', authMiddleware("ADMIN"), usersController.updateUser)

// Deletar/Desativar um usuário
route.delete('/:id', authMiddleware("ADMIN"), usersController.deleteUser)

export default route;