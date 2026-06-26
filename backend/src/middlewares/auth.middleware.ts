// Aqui crie um lógica de autorização simples para verificar se o usuário tem a role necessária para acessar a rota

import { ErrorResponse } from "@/types/error.type.js";
import type { NextFunction, Request, Response } from "express";

export default function authMiddleware(requiredRole: string) {
    return (req: Request, res: Response, next: NextFunction) => {

        const useRole = req.headers['x-role'];

        if (!useRole || useRole !== requiredRole) {
            throw new ErrorResponse("Acesso Negado", 403)
        }

        next();
    }
}