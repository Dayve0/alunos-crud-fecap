import { axiosInstance } from "../config/axios.config";
import type { IUser } from "../types/users.interface";

class UsersService {
    private static instance: UsersService;

    private constructor() { };

    public static getInstance() {
        if (!this.instance) {
            this.instance = new UsersService();
        };
        return this.instance
    }

    public async getUsers() {
        try {

            const response = await axiosInstance.get<IUser[] | null>("/users/");

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao buscar os usuários")
            };

            return data;
        } catch (error) {
            console.error("Erro ao buscar os usuários", error);
        }
    }

    public async getUser(id: number) {
        try {

            const response = await axiosInstance.get<IUser | null>(`/users/`, { params: { id: id } });

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao buscar as informações do usuário");
            };

            return data;
        } catch (error) {
            console.error("Erro ao buscar as informações do usuário", error);
        }
    }

    public async createUser(newUser: IUser) {
        try {

            const response = await axiosInstance.post<IUser | null>(`/users/`, newUser, { headers: { 'x-role': 'ADMIN' } });

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao cadastrar o usuário");
            };

            return data;
        } catch (error) {
            console.error("Erro ao cadastrar o usuário", error);
        }
    }

    public async updateUser(id: number, updatedUser: Partial<IUser>) {
        try {

            const response = await axiosInstance.patch<IUser | null>(`/users/`, updatedUser, { params: { id: id }, headers: { 'x-role': 'ADMIN' } });

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao atualizar o usuário");
            };

            return data;
        } catch (error) {
            console.error("Erro ao atualizar o usuário", error);
        }
    }

    public async deleteStudent(id: number) {
        try {

            const response = await axiosInstance.delete<IUser | null>(`/users/`, { params: { id: id }, headers: { 'x-role': 'ADMIN' } });

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao deletar o usuário");
            };

            return data;
        } catch (error) {
            console.error("Erro ao deletar o usuário", error);
        }
    }


};

export default UsersService.getInstance();