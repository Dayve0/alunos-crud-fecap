import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { useEffect, useState } from "react";
import type { IStudent } from "../../types/students.interface";

interface StudentFormProps {
    initialValues?: Partial<IStudent>;
    submitText: string;
    onSubmit: (student: IStudent) => Promise<void>;
}

export default function StudentForm({
    initialValues,
    submitText,
    onSubmit,
}: StudentFormProps) {
    const [student, setStudent] = useState<Partial<IStudent>>({
        name: initialValues?.name ?? "",
        email: initialValues?.email ?? "",
        course: initialValues?.course ?? "",
        age: initialValues?.age,
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function handleChange<K extends keyof IStudent>(
        field: K,
        value: IStudent[K]
    ) {
        setStudent((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (
            !student.name?.trim() ||
            !student.email?.trim() ||
            !student.course?.trim() ||
            student.age === undefined
        ) {
            return;
        }

        await onSubmit(student as IStudent);
    }

    useEffect(() => {

        function load() {
            if (initialValues) {
                setStudent({
                    name: initialValues.name ?? "",
                    email: initialValues.email ?? "",
                    course: initialValues.course ?? "",
                    age: initialValues.age ?? 0,
                });
            }
        }

        load()
    }, [initialValues]);

    return (
        <Form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <TextField isRequired>
                <Label>Nome</Label>

                <Input
                    placeholder="José Alberto"
                    value={student.name ?? ""}
                    onChange={(value) =>
                        handleChange("name", value.target.value)
                    }
                />

                <FieldError>
                    O nome é obrigatório.
                </FieldError>
            </TextField>

            <TextField
                isRequired
                isInvalid={
                    student.email !== "" &&
                    student.email !== undefined &&
                    !emailRegex.test(student.email)
                }
            >
                <Label>E-mail</Label>

                <Input
                    placeholder="email@teste.com"
                    value={student.email ?? ""}
                    onChange={(value) =>
                        handleChange("email", value.target.value)
                    }
                />

                <FieldError>
                    Digite um e-mail válido.
                </FieldError>
            </TextField>

            <TextField isRequired>
                <Label>Curso</Label>

                <Input
                    placeholder="Engenharia"
                    value={student.course ?? ""}
                    onChange={(value) =>
                        handleChange("course", value.target.value)
                    }
                />

                <FieldError>
                    O curso é obrigatório.
                </FieldError>
            </TextField>

            <TextField
                isRequired
                isInvalid={
                    student.age !== undefined &&
                    student.age < 16
                }
            >
                <Label>Idade</Label>

                <Input
                    type="number"
                    placeholder="16"
                    value={student.age?.toString() ?? ""}
                    onChange={(value) =>
                        handleChange("age", Number(value.target.value))
                    }
                />

                <FieldError>
                    A idade mínima é 16 anos.
                </FieldError>
            </TextField>

            <Button
                type="submit"
                className="w-full bg-blue-500 text-white"
            >
                {submitText}
            </Button>
        </Form>
    );
}