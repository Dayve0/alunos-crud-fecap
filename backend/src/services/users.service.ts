import type { PrismaType } from "@/lib/prisma";
import usersRepository from "@/repositories/users.repository";
import { ErrorResponse } from "@/types/error.type";
import { generatePassword, sendEmail } from "@/utils/util";
import bcrypt from "bcrypt";

class UsersService {

    private static instance: UsersService

    private constructor() { };

    public static getInstance() {
        if (!this.instance) {
            this.instance = new UsersService();
        }
        return this.instance;
    };

    public async getusers() {
        return usersRepository.getAll();
    };

    public async getByID(id: number) {

        const user = await usersRepository.getByID(id);
        if (!user) {
            throw new ErrorResponse("O estudante não existe", 404);
        }

        return user;
    };

    public async getByEmail(email: string) {

        const user = await usersRepository.getByEmail(email);
        if (!user) {
            throw new ErrorResponse("O estudante não existe", 404);
        }

        return user;
    };

    public async createUser(newUser: PrismaType.usersCreateInput) {

        const exist = await usersRepository.getByEmail(newUser.email);
        if (exist) {
            throw new ErrorResponse("O usuário já existe", 400);
        }

        const temporaryPassword = generatePassword()

        const createdUser = await usersRepository.create({
            name: newUser.email.split("@")[0]!,
            email: newUser.email,
            password: await bcrypt.hash(temporaryPassword, 10),
            role: "ADMIN"
        });

        if (!createdUser) {
            throw new ErrorResponse("Erro ao criar o usuário", 500);
        }

        const emailSend = await sendEmail(newUser.email, temporaryPassword);

        if (!emailSend) {
            throw new ErrorResponse("Erro ao criar o usuário", 500);
        }

        return true
    };

    public async updateUser(id: number, updatedUser: PrismaType.usersUpdateInput) {

        const exist = await this.getByID(id);
        if (!exist) {
            throw new ErrorResponse("O usuário não existe", 404);
        }

        return await usersRepository.update(id, updatedUser)
    };

    public async deleteUser(id: number) {

        const exist = await this.getByID(id);
        if (!exist) {
            throw new ErrorResponse("O usuário não existe", 404);
        }

        return await usersRepository.delete(id)
    };

    public async resetPassword(email: string, oldPassword: string, newPassword: string) {

        if (newPassword.length < 8) {
            throw new ErrorResponse("A nova senha precisa conter 8 caracteres", 400);
        };

        if (newPassword == oldPassword) {
            throw new ErrorResponse("A nova senha não pode ser igual a atual", 400);
        };

        const user = await this.getByEmail(email);

        const isValid = await bcrypt.compare(oldPassword, user.password);

        if (!isValid) {
            throw new ErrorResponse("Senha atual incorreta", 400);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        return await this.updateUser(user.id, { password: hashedPassword })
    }

};

export default UsersService.getInstance()