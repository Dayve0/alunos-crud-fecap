import type { AuthRequest } from '@/types/auth.type.js';
import { ErrorResponse } from '@/types/error.type.js';
import type { NextFunction, Response } from 'express';

export default function errorMiddleware(
    error: Error,
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {

    // Erros previstos
    if (error instanceof ErrorResponse) {
        return res.status(error.code).json({
            status: 'error',
            message: error.message,
        });
    }

    // Erros Operacionais / Inesperados
    console.error('ERRO CRÍTICO NÃO TRATADO:', error);

    return res.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor.',
    });
};