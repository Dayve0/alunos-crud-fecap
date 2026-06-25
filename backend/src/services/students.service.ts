// Aqui estou criando a classe service para gerenciar a terceira parte da requisição
// Esse service vai ser responsável por administrar as regras de negócios

import type { IStudent } from "@/interfaces/students.interface";
import studentsRepository from "@/repositories/students.repository";
import { ErrorResponse } from "@/types/error.type";

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

    public async existStudent(email: string) {
        const student = await studentsRepository.getByEmail(email);
        return !!student;
    }

    public async createStudent(newStudent: IStudent) {

        const exist = await this.existStudent(newStudent.email);
        if (exist) {
            throw new ErrorResponse("O Estudante já existe", 400);
        }

        return await studentsRepository.create(newStudent)
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