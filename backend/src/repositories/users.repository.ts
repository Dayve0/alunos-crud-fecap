import type { IUser } from "@/interfaces/users.interface";
import { prisma, PrismaType } from "@/lib/prisma";

class UsersRepository {

    private static instance: UsersRepository

    private constructor() { };

    public static getInstance() {
        if (!this.instance) {
            this.instance = new UsersRepository();
        }
        return this.instance;
    };

    public async getAll() {
        return await prisma.users.findMany();
    };

    public async getByID(id: number) {
        return await prisma.users.findUnique({ where: { id: id } });
    };

    public async getByEmail(email: string) {
        return await prisma.users.findUnique({ where: { email: email } });
    };

    public async login(email: string) {
        return await prisma.users.findUnique({
            where: { email: email }, select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });
    };

    public async create(newUser: PrismaType.usersCreateInput) {
        return await prisma.users.create({ data: newUser });
    };

    public async update(id: number, updatedUser: PrismaType.usersUpdateInput) {
        return await prisma.users.update({ where: { id: id }, data: { ...updatedUser, updatedAt: Date.now().toLocaleString("pt-BR") } })
    };

    public async delete(id: number) {
        return await prisma.users.update({ where: { id: id }, data: { updatedAt: Date.now().toLocaleString("pt-BR"), deletedAt: Date.now().toLocaleString("pt-BR") } });
    };

};

export default UsersRepository.getInstance()