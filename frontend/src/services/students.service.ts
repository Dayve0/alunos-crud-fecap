import { toast } from "react-toastify";
import { axiosInstance } from "../config/axios.config";
import type { IStudent } from "../types/students.interface";

class StudentsService {
    private static instance: StudentsService;

    private constructor() { };

    public static getInstance() {
        if (!this.instance) {
            this.instance = new StudentsService();
        };
        return this.instance
    }

    public async getStudents() {
        try {

            const response = await axiosInstance.get<IStudent[] | null>("/students/", { headers: { 'x-role': 'ADMIN' } });

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao buscar os alunos")
            };

            return data;
        } catch (error) {
            console.error("Erro ao buscar os alunos", error);
            toast.error("Erro ao buscar os alunos")
        }
    }

    public async getStudent(id: number) {
        try {

            const response = await axiosInstance.get<IStudent | null>(`/students/${id}`);

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao buscar as informações do aluno");
            };

            return data;
        } catch (error) {
            console.error("Erro ao buscar o aluno", error);
        }
    }

    public async createStudent(student: IStudent) {
        try {

            const response = await axiosInstance.post<IStudent | null>(`/students/`, student, { headers: { 'x-role': 'ADMIN' } });

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao cadastrar o aluno");
            };

            toast.success("Aluno cadastrado com sucesso")

            return data;
        } catch (error) {
            console.error("Erro ao cadastrar o aluno", error);
            toast.error("Erro ao cadastrar o aluno")
        }
    }

    public async updateStudent(id: number, updatedStudent: Partial<IStudent>) {
        try {

            const response = await axiosInstance.patch<IStudent | null>(`/students/${id}`, updatedStudent, { headers: { 'x-role': 'ADMIN' } });

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao atualizar o aluno");
            };

            toast.success("Aluno atualizado com sucesso")


            return data;
        } catch (error) {
            console.error("Erro ao atualizar o aluno", error);
            toast.error("Erro ao atualizar o aluno")
        }
    }

    public async activateStudent(id: number) {
        try {

            const response = await axiosInstance.get<IStudent | null>(`/students/activate/${id}`, { headers: { 'x-role': 'ADMIN' }, });

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao atualizar o aluno");
            };

            toast.success("Aluno atualizado com sucesso")


            return data;
        } catch (error) {
            console.error("Erro ao atualizar o aluno", error);
            toast.error("Erro ao atualizar o aluno")
        }
    }

    public async deleteStudent(id: number) {
        try {

            const response = await axiosInstance.delete<IStudent | null>(`/students/${id}`, { headers: { 'x-role': 'ADMIN' } });

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao deletar o aluno");
            };

            toast.success("Aluno deletado com sucesso")

            return data;
        } catch (error) {
            console.error("Erro ao deletar o aluno", error);
            toast.error("Erro ao deletar o aluno")
        }
    }


};

export default StudentsService.getInstance();