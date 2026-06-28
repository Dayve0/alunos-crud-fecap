import { ArrowRightToSquare, GraduationCap, Tachometer } from '@gravity-ui/icons';
import { Button } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/userHook";
import { router } from "../routes/route";
import authService from '../services/auth.service';

export default function Navbar() {

    const navigate = useNavigate()

    const location = useLocation();
    const { user } = useUser();
    const currentPath = location.pathname;

    // Lista estruturada dos links idêntica à imagem
    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: <Tachometer /> },
        { name: "Cadastrar aluno", path: "/dashboard/alunos/cadastrar", icon: <GraduationCap /> },
    ];


    function logout() {
        authService.logout()
        navigate("/")
    }

    return (
        // A tag <aside> tem largura fixa, ocupa 100% da altura da tela (h-screen) e fica oculta no celular (hidden md:flex)
        <aside className="w-65 h-screen bg-background border-r border-default-200 flex-col py-6 px-4 shrink-0 hidden md:flex">

            {/* 1. PERFIL DO USUÁRIO (Topo) */}
            <div className="flex items-center gap-3 px-2 mb-8">
                {/* Avatar com o mesmo efeito de gradiente da imagem */}
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-300 via-blue-500 to-purple-400 shrink-0" />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{user?.name}</span>
                    <span className="text-xs text-default-500">{user?.role}</span>
                </div>
            </div>

            {/* 2. LINKS DE NAVEGAÇÃO PRINCIPAIS */}
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                    // Lógica para saber se o link é a página atual
                    const isActive = currentPath === item.path || (item.name === "Dashboard" && currentPath === "/dashboard");

                    return (
                        <Button
                            key={item.name}
                            // Se ativo, usa "flat" (fundo suave). Se inativo, "light" (transparente)
                            variant={isActive ? "primary" : "ghost"}
                            className={`justify-between w-full h-11 px-3 transition-colors ${isActive
                                ? 'bg-default-100 font-medium text-white'
                                : 'text-default-500 hover:text-foreground'
                                }`}
                            onClick={() => { router.navigate(item.path) }}
                        >
                            {/* Lado esquerdo do botão (Ícone + Texto) */}
                            <div className="flex items-center gap-3">
                                <span className="text-lg opacity-80">{item.icon}</span>
                                <span className="text-sm">{item.name}</span>
                            </div>

                        </Button>
                    );
                })}
            </nav>

            <div className="mt-auto flex flex-col gap-1">

                <Button
                    variant="ghost"
                    className="justify-start w-full h-11 px-3 text-default-500 hover:text-foreground"
                    onClick={() => logout()}
                >
                    <span className="text-lg mr-2 opacity-80"><ArrowRightToSquare /></span>
                    <span className="text-sm">Sair</span>
                </Button>

            </div>
        </aside>
    );
}