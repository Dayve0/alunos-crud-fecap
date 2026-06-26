// Arquivo base para o gerenciamento das rotas da API

import authRoute from '@/routes/auth.route';
import studentsRoute from '@/routes/students.route.js';
import usersRoute from '@/routes/users.route';
import { Router } from "express";

const route = Router()

route.use('/auth', authRoute)
route.use('/students', studentsRoute)
route.use('/users', usersRoute)

export default route;