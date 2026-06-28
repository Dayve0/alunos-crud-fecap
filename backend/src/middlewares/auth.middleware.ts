// Aqui crie um lógica de autorização simples para verificar se o usuário tem a role necessária para acessar a rota

import { ErrorResponse } from "@/types/error.type.js";
import type { NextFunction, Request, Response } from "express";

export default function authMiddleware(requiredRole: string) {
    return (req: Request, res: Response, next: NextFunction) => {

        const user = JSON.parse(req.cookies.user)

        if (!user) {
            throw new ErrorResponse("Acesso Negado sem cookie", 403)
        }

        const userRole = user.role

        if (!userRole || userRole !== requiredRole) {
            throw new ErrorResponse("Acesso Negado, sem permissão", 403)
        }

        next();
    }
}