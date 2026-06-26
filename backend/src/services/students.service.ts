import bcrypt from 'bcrypt';
// Aqui estou criando a classe service para gerenciar a terceira parte da requisição
// Esse service vai ser responsável por administrar as regras de negócios

import type { IStudent } from "@/interfaces/students.interface";
import { prisma, type PrismaType } from "@/lib/prisma";
import studentsRepository from "@/repositories/students.repository";
import { ErrorResponse } from "@/types/error.type";
import usersService from "./users.service";
import { generatePassword } from "@/utils/util";

class StudentsService {

    private static instance: StudentsService

    private constructor() { };

    public static getInstance() {
        if (!this.instance) {
            this.instance = new StudentsService();
        }
        return this.instance;
    };

    public async getStudents() {
        return studentsRepository.getAll();
    };

    public async getByID(id: number) {

        const student = await studentsRepository.getByID(id);
        if (!student) {
            throw new ErrorResponse("O estudante não existe", 404);
        }

        return student;
    };

    public async getByEmail(email: string) {
        const student = await studentsRepository.getByEmail(email);
        return !!student;
    }

    public async createStudent(newStudent: PrismaType.studentsCreateInput) {

        if (newStudent.age < 16) {
            throw new ErrorResponse("Idade inválida", 400);
        }

        const exist = await this.getByEmail(newStudent.email);
        if (exist) {
            throw new ErrorResponse("O Estudante já existe", 400);
        }

        return prisma.$transaction(async (tx) => {

            const password = generatePassword(newStudent.name.split(" ")[0]!)

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await tx.users.create({
                data: {
                    email: newStudent.email,
                    name: newStudent.name,
                    role: "STUDENT",
                    password: hashedPassword
                }
            })

            if (!user) {
                throw new ErrorResponse("Erro ao cadastrar aluno", 500)
            }

            return await tx.students.create({
                data: { ...newStudent, status: "ATIVO" }
            })

        })
    };

    public async updateStudent(updatedStudent: IStudent) {

        const exist = await this.getByID(updatedStudent.id);
        if (!exist) {
            throw new ErrorResponse("O estudante não existe", 404);
        }

        return await studentsRepository.update(updatedStudent)
    };

    public async deleteStudent(id: number) {

        const exist = await this.getByID(id);
        if (!exist) {
            throw new ErrorResponse("O estudante não existe", 404);
        }

        return await studentsRepository.delete(id)
    };

};

export default StudentsService.getInstance()