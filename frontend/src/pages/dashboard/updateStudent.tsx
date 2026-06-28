import { Card } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import studentsService from "../../services/students.service";
import type { IStudent } from "../../types/students.interface";
import StudentForm from "../../components/forms/studentForm";

export default function UpdateStudentPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState<Partial<IStudent>>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStudent() {
            try {
                if (!id) {
                    navigate("/dashboard");
                    return;
                }

                const data = await studentsService.getStudent(Number(id));

                if (!data) {
                    navigate("/dashboard/students");
                    return;
                }

                console.log("Sou o aluno", data);


                setStudent(data);
            } catch {
                toast.error("Erro ao buscar aluno.");
                navigate("/dashboard");
            } finally {
                setLoading(false);
            }
        }

        loadStudent();
    }, [id, navigate]);

    async function handleUpdate(student: IStudent) {
        try {
            await studentsService.updateStudent(Number(id), student);

            toast.success("Aluno atualizado.");

            navigate("/dashboard");
        } catch {
            toast.error("Erro ao atualizar aluno.");
        }
    }

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="flex flex-1 items-center justify-center p-4">
            <Card className="w-full max-w-lg p-8">
                <h2 className="mb-1 text-2xl font-bold">
                    Atualizar Aluno
                </h2>

                <p className="mb-6 text-default-500">
                    Atualize os dados abaixo.
                </p>

                <StudentForm
                    initialValues={student}
                    submitText="Atualizar"
                    onSubmit={handleUpdate}
                />
            </Card>
        </div>
    );
}