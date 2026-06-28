import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { IBackendError } from "../types/error.interface";

export function handleError(err: unknown) {
    const axiosError = err as AxiosError<IBackendError>;

    if (axiosError.response) {
        toast.error(`Erro: ${axiosError.response.data.message}`);
    } else {
        console.error("Erro de rede ou configuração:", axiosError.message);
        toast.error("Erro de conexão com o servidor.");
    }
}