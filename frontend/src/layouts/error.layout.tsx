import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorLayout() {
    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            navigate("/dashboard")
        }, 3000);

    }, [])

    return (
        <div className="w-screen h-screen flex-1 flex flex-col gap-3 justify-center items-center">
            <h1 className="text-danger text-4xl font-semibold">Ocorreu um erro inesperado</h1>
            <h2 className="text-2xl text-black font-normal">Retornando a tela principal em 3 segundos</h2>
        </div>
    );
};