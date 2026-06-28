import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { axiosInstance } from "../config/axios.config";
import { handleError } from "../middlewares/error.middleware";

class AuthService {
    private static instance: AuthService;

    private constructor() { };

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService();
        };
        return this.instance;
    }

    public async register(email: string, accessPassword: string) {
        try {
            // Removi o HttpStatusCode para o .data receber o objeto correto do backend
            const response = await axiosInstance.post("/auth/register", { email }, {
                headers: { "x-secreto": accessPassword }
            });

            const data = response.data;

            if (!data) {
                throw new Error("Erro ao registrar");
            }

            toast.success("Registrado com sucesso, verifique seu email");

            return data;
        } catch (err: unknown) {
            handleError(err);
            throw err;
        }
    }

    public async login(email: string, password: string) {
        try {
            const response = await axiosInstance.post(`/auth/login`, { email, password });
            const data = response.data;

            if (!data) {
                throw new Error("Erro ao entrar");
            }

            Cookies.set('user', JSON.stringify(data), { expires: 7 });
            toast.success("Logado com sucesso");

            return data;
        } catch (err: unknown) {
            handleError(err);
            throw err;
        }
    }

    public logout() {
        try {

            Cookies.remove('user');

        } catch (error) {
            console.error("Erro ao deslogar", error);

        }
    }

    public async forgetPassword(email: string) {
        try {
            const response = await axiosInstance.post(`/students/`, { email });
            const data = response.data;

            if (!data) {
                throw new Error("Erro ao solicitar nova senha");
            }

            toast.success("Nova senha criada com sucesso, verifique seu email");

            return data;
        } catch (err: unknown) {
            handleError(err);
            throw err;
        }
    }


}

export default AuthService.getInstance();