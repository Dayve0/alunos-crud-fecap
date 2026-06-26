import usersService from "@/services/users.service";
import type { NextFunction, Request, Response } from "express";

class UsersController {

    private static instance: UsersController

    private constructor() { };

    public static getInstance() {
        if (!this.instance) {
            this.instance = new UsersController();
        }
        return this.instance;
    };

    // GET
    public async getUsers(req: Request, res: Response, next: NextFunction) {
        try {

            const users = await usersService.getusers();

            return res.status(200).json(users);
        } catch (error) {
            next(error)
        }
    };

    // GET
    public async getUser(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            const user = await usersService.getByID(Number(id));

            return res.status(200).json(user);
        } catch (error) {
            next(error)
        }
    };

    // POST
    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {

            const newuser = req.body;

            const user = await usersService.createUser(newuser);

            return res.status(201).json(user);
        } catch (error) {
            next(error)
        }
    };

    // PATCH
    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params

            const updateduser = req.body;

            const user = await usersService.updateUser(Number(id), updateduser);

            return res.status(200).json(user);
        } catch (error) {
            next(error)
        }
    };

    // DELETE
    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            const user = await usersService.deleteUser(Number(id));

            return res.status(200).json(user);
        } catch (error) {
            next(error)
        }
    };

    // GET
    public async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {

            const { email, oldPassword, newPassword } = req.body;

            const user = await usersService.resetPassword(email, oldPassword, newPassword);

            return res.status(200).json("Senha alterada com sucesso.")
        }
        catch (error) {
            next(error)
        }
    };

};

export default UsersController.getInstance()