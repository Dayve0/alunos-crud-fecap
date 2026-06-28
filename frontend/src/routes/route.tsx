import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/dashboard.layout";
import authMiddleware from "../middlewares/auth.middleware";
import CreateStudentPage from "../pages/dashboard/createStudent.page";
import DashboardPage from "../pages/dashboard/dashboard.page";
import UpdateStudentPage from "../pages/dashboard/updateStudent";
import LoginPage from "../pages/login.page";
import RegisterPage from "../pages/register.page";
import ErrorLayout from "../layouts/error.layout";

// Um componente simples só para servir de "casca" para as rotas filhas

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
        errorElement: <ErrorLayout />,
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        loader: authMiddleware, // Protege tudo que está dentro
        children: [
            {
                // Rota padrão do dashboard
                path: '/dashboard',
                element: <DashboardPage />
            },
            {
                // Nova rota de cadastro de alunos: /dashboard/students
                path: '/dashboard/alunos/cadastrar',
                element: <CreateStudentPage />
            },
            {
                // Nova rota de cadastro de alunos: /dashboard/students
                path: '/dashboard/alunos/:id/editar',
                element: <UpdateStudentPage />
            },
        ]
    }
]);