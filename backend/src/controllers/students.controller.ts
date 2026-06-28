// Aqui estou criando a classe controller para gerenciar a segunda parte da requisição
// Esse controller vai ser responsável por modificar a entrada e saida das requisições caso necessário

import studentsService from "@/services/students.service";
import type { NextFunction, Request, Response } from "express";

class StudentsController {

    // Aqui eu crio uma instancia privada para ser usada somente dentro do controller
    private static instance: StudentsController

    // Crio um constructor privado para garantir que não seja possivel criar uma instancia da classe em outro lugar da API
    private constructor() { };

    // A função responsável por criar e disponibilicar a instancia
    public static getInstance() {
        if (!this.instance) {
            this.instance = new StudentsController();
        }
        return this.instance;
    };

    // GET
    public async getStudents(req: Request, res: Response, next: NextFunction) {
        try {

            const students = await studentsService.getStudents();

            return res.status(200).json(students);
        } catch (error) {
            next(error)
        }
    };

    // GET
    public async getStudent(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            const student = await studentsService.getByID(Number(id));

            return res.status(200).json(student);
        } catch (error) {
            next(error)
        }
    };

    // POST
    public async createStudent(req: Request, res: Response, next: NextFunction) {
        try {

            const newStudent = req.body;

            const student = await studentsService.createStudent(newStudent);

            return res.status(201).json(student);
        } catch (error) {
            next(error)
        }
    };

    // PATCH
    public async updateStudent(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            const updatedStudent = req.body;

            const student = await studentsService.updateStudent(Number(id), updatedStudent);

            return res.status(200).json(student);
        } catch (error) {
            next(error)
        }
    };

    // DELETE
    public async deleteStudent(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            const student = await studentsService.deleteStudent(Number(id));

            return res.status(200).json(student);
        } catch (error) {
            next(error)
        }
    };

    // DELETE
    public async activateStudent(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            const student = await studentsService.updateStudent(Number(id), { status: "ATIVO" });

            return res.status(200).json(student);
        } catch (error) {
            next(error)
        }
    };

};

export default StudentsController.getInstance()