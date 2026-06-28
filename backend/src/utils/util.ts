import type { IUser } from "@/interfaces/users.interface";
import crypto from "crypto";
import nodemailer from 'nodemailer';

export function generatePassword(plainPassword?: string) {

    if (plainPassword != undefined) {
        return plainPassword
    }

    return crypto.randomBytes(4).toString('hex');
}

export async function sendEmail(to: string, password: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "zac580110@gmail.com",
            pass: process.env.EMAIL_PASS,
        },
    });

    // 2. Faz o disparo
    const info = await transporter.sendMail({
        from: `"Meu App" <"zac580110@gmail.com">`,
        to: to,
        subject: "Senha padrão criada",
        html: `<p>Obrigado por se cadastrar segue a senha gerada: ${password}</p> <br> <p> Você pode alterar a senha quando quiser</p>`,
    });

    if (!info) {
        throw new Error("Erro ao enviar o email");
    }

    return true;
}


export function userMapper(user: IUser) {
    const { createdAt, password, updatedAt, ...cleanedUser } = user

    return cleanedUser
}