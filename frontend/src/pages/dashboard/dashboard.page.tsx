import { Card } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { StudentsTable } from "../../components/smart/studentsTable";
import { useUser } from "../../hooks/userHook";
import studentsService from "../../services/students.service";
import type { IStudent } from "../../types/students.interface";

interface StatCardProps {
    title: string;
    value: number;
}

function StatCard({ title, value }: StatCardProps) {
    return (
        <Card className="flex-1 border border-default-200">
            <div className="p-4">
                <span className="text-default-500 text-base font-medium">
                    {title}
                </span>

                <div className="mt-2 flex items-center justify-between">
                    <span className="text-2xl font-bold">
                        {value}
                    </span>
                </div>
            </div>
        </Card>
    );
}

export default function DashboardPage() {
    const { user } = useUser();

    const [students, setStudents] = useState<IStudent[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    async function carregarDados() {
        try {
            setIsLoading(true);

            const data = await studentsService.getStudents();

            setStudents(data ?? []);
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
            setStudents([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {

        async function load() {
            await carregarDados()
        }


        load();
    }, []);

    const statistics = useMemo(() => {
        const active = students.filter(
            (student) => student.status === "ATIVO"
        ).length;

        const inactive = students.filter(
            (student) => student.status === "INATIVO"
        ).length;

        const countByCourse = students.reduce<Record<string, number>>(
            (acc, student) => {
                acc[student.course] = (acc[student.course] ?? 0) + 1;
                return acc;
            },
            {}
        );

        const courses = Object.entries(countByCourse).map(
            ([course, total]) => ({
                course,
                total,
            })
        );

        return {
            active,
            inactive,
            courses,
        };
    }, [students]);

    const stats = [
        {
            title: "Alunos cadastrados",
            value: students.length,
        },
        {
            title: "Alunos ativos",
            value: statistics.active,
        },
        {
            title: "Alunos inativos",
            value: statistics.inactive,
        },
    ];

    return (
        <div className="flex-1 bg-white p-4">
            <div className="flex h-full flex-col gap-6">
                <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-2xl font-semibold">
                        Olá, {user?.name ?? "Usuário"}
                    </h1>
                </header>

                <section className="flex flex-col gap-4 lg:flex-row">
                    {stats.map((stat) => (
                        <StatCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                        />
                    ))}
                </section>

                <section className="w-full h-full flex flex-col gap-4 lg:flex-row ">
                    <StudentsTable
                        students={students}
                        isLoading={isLoading}
                        onAction={carregarDados}
                    />

                    <div className="w-full flex flex-col justify-between items-center">

                        <Card className="w-full border border-default-200 p-4  lg:shrink-0">
                            <h2 className="mb-4 text-center text-xl font-medium">
                                Alunos por curso
                            </h2>

                            <div className="flex flex-col gap-3">
                                {statistics.courses.length === 0 ? (
                                    <p className="text-center text-default-500">
                                        Nenhum aluno encontrado.
                                    </p>
                                ) : (
                                    statistics.courses.map((course) => (
                                        <Card
                                            key={course.course}
                                            className="border border-default-200"
                                        >
                                            <div className="p-4">
                                                <span className="text-sm text-default-500">
                                                    {course.course}
                                                </span>

                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-2xl font-bold">
                                                        {course.total}
                                                    </span>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </Card>


                        <div className="w-full">
                            <StatCard title="Em breve" value={0} />
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}