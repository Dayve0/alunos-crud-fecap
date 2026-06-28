// Arquivo principal para rodar a API

import routes from '@/routes/router.js';
import "dotenv/config";
import express from "express";
import errorMiddleware from "./middlewares/error.middleware";
import cors from 'cors'
import cookieParser from 'cookie-parser';

const PORT = Number(process.env.API_PORT) ?? 3001;

const app = express();

// Permitir que o frontend acesse a API
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

try {

    app.use('/api', routes);

    app.use(errorMiddleware);

    app.listen(PORT, () => {
        console.log(`Aplicação rodando na porta ${PORT}`);
    });

} catch (error) {
    console.error('Erro ao iniciar a API:', error);
};