import authService from "@/services/auth.service";
import { ErrorResponse } from "@/types/error.type";
import { userMapper } from "@/utils/util";
import type { NextFunction, Request, Response } from "express";

class AuthController {

    private static instance: AuthController

    private constructor() { };

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AuthController();
        }
        return this.instance;
    };

    // GET
    public async register(req: Request, res: Response, next: NextFunction) {
        try {

            const secret = req.headers["x-secreto"];

            if (secret != "CAPS") {
                throw new ErrorResponse("Não autorizado", 401)
            }


            const data = req.body;

            const { email } = data;

            const created = await authService.register(email);

            res.status(201).json(created);
        }
        catch (error) {
            next(error)
        }
    };

    // GET
    public async login(req: Request, res: Response, next: NextFunction) {
        try {

            const data = req.body

            const { email, password } = data
            const senha = password

            const user = await authService.login(email, password);

            const cleanedUser = userMapper(user)

            res.cookie("user", JSON.stringify(cleanedUser), {
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 // Expira em 1 dia
            })

            return res.status(200).json(cleanedUser)
        }
        catch (error) {
            next(error)
        }
    };

    // GET
    public async forgetPassword(req: Request, res: Response, next: NextFunction) {
        try {

            const secret = req.headers["x-secreto"];

            if (secret != "CAPS") {
                throw new ErrorResponse("Não autorizado", 401)
            }

            const { email } = req.body;

            const user = await authService.forgetPassword(email);

            return res.status(200).json("Senha alterada com sucesso.")
        }
        catch (error) {
            next(error)
        }
    };

}

export default AuthController.getInstance()