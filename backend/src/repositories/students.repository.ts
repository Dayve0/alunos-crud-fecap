// Aqui estou criando a classe repository para gerenciar a ultima parte da requisição
// Esse repository é a base para utilizar o ORM/Banco, acredito que estruturando desta forma modularizada
// Caso seja necessário a troca do ORM ou do BANCO fica mais fácil

import type { IStudent } from "@/interfaces/students.interface";
import { prisma, PrismaType } from "@/lib/prisma";

class StudentsRepository {

    private static instance: StudentsRepository

    private constructor() { };

    public static getInstance() {
        if (!this.instance) {
            this.instance = new StudentsRepository();
        }
        return this.instance;
    };

    public async getAll() {
        return await prisma.students.findMany();
    };

    public async getByID(id: number) {
        return await prisma.students.findUnique({ where: { id: id } });
    };

    public async getByEmail(email: string) {
        return await prisma.students.findUnique({ where: { email: email } });
    };

    public async create(newStudent: PrismaType.studentsCreateInput) {
        return await prisma.students.create({ data: { ...newStudent, status: "CADASTRADO" } });
    };

    public async update(id: number, updatedStudent: PrismaType.studentsUpdateInput) {
        return await prisma.students.update({ where: { id: id }, data: updatedStudent })
    };

    public async delete(id: number) {
        return await prisma.students.update({ where: { id: id }, data: { status: "INATIVO", deletedAt: new Date().toISOString() } });
    };

};

export default StudentsRepository.getInstance()