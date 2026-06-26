// Aqui ficam as rotas relacionadas a login e cadastro

import authController from "@/controllers/auth.controller";
import { Router } from "express";

const route = Router()

route.use('/register', authController.register)
route.use('/login', authController.login)
route.use('/forgetPassword', authController.forgetPassword)

export default route;