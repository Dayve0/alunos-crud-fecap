import { Card } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../../components/forms/studentForm";
import studentsService from "../../services/students.service";
import type { IStudent } from "../../types/students.interface";

export default function CreateStudentPage() {
    const navigate = useNavigate();

    async function handleCreate(student: IStudent) {
        try {
            await studentsService.createStudent(student);

            navigate("/dashboard");
        } catch (error) {
            console.error("Erro ao cadastrar o aluno", error);

        }
    }

    return (
        <div className="flex flex-1 items-center justify-center p-4">
            <Card className="w-full max-w-lg p-8">
                <h2 className="mb-1 text-2xl font-bold">
                    Novo Aluno
                </h2>

                <p className="mb-6 text-default-500">
                    Preencha os dados abaixo.
                </p>

                <StudentForm
                    submitText="Cadastrar"
                    onSubmit={handleCreate}
                />
            </Card>
        </div>
    );
}