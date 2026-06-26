import { prisma } from "@/lib/prisma";
import usersRepository from "@/repositories/users.repository";
import { ErrorResponse } from "@/types/error.type";
import { generatePassword, sendEmail } from "@/utils/util";
import bcrypt from 'bcrypt';
import usersService from "./users.service";

class AuthService {

    private static instance: AuthService

    private constructor() { };

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    };


    public async register(email: string) {

        const exist = await usersRepository.getByEmail(email);
        if (exist) {
            throw new ErrorResponse("O usuário já existe", 400);
        };

        return prisma.$transaction(async (tx) => {
            const temporaryPassword = generatePassword();
            const createdUser = await tx.users.create({
                data: {
                    name: email.split("@")[0]!,
                    email: email,
                    password: await bcrypt.hash(temporaryPassword, 10),
                    role: "ADMIN"
                }
            });

            if (!createdUser) {
                throw new ErrorResponse("Erro ao criar o usuário", 500);
            };

            const emailSend = await sendEmail(email, temporaryPassword);

            if (!emailSend) {
                throw new ErrorResponse("Erro ao criar o usuário", 500);
            };

            return true;
        });
    };


    public async login(email: string, password: string) {

        const user = await usersRepository.getByEmail(email);
        if (!user) {
            throw new ErrorResponse("Email ou senha inválidos", 400);
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            throw new ErrorResponse("Email ou senha inválidos", 400);
        }

        return user;
    };

    public async resetPassword(email: string, oldPassword: string, newPassword: string) {

        if (newPassword.length < 8) {
            throw new ErrorResponse("A nova senha precisa conter 8 caracteres", 400);
        };

        if (newPassword == oldPassword) {
            throw new ErrorResponse("A nova senha não pode ser igual a atual", 400);
        };

        const user = await usersService.getByEmail(email);

        const isValid = await bcrypt.compare(oldPassword, user.password);

        if (!isValid) {
            throw new ErrorResponse("Senha atual incorreta", 400);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        return await usersService.updateUser(user.id, { password: hashedPassword })
    }

    public async forgetPassword(email: string) {

        const user = await usersService.getByEmail(email);

        const newTemporaryPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(newTemporaryPassword, 10);

        const emailSend = await sendEmail(email, newTemporaryPassword);

        return await usersService.updateUser(user.id, { password: hashedPassword })
    }

};

export default AuthService.getInstance()