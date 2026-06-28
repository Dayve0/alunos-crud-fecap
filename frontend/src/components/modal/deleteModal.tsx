"use client";

import { Gear } from "@gravity-ui/icons";
import { Button, Input, Modal } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import studentsService from "../../services/students.service";
import { useNavigate } from "react-router-dom";

export function DeleteStudentModal({ children, id, name, onDelete }: { children: React.ReactNode, id: number, name: string, onDelete?: () => void }) {
    const navigate = useNavigate()
    const [confirm, setConfirm] = useState<string>("")

    async function deleteStudent() {

        if (confirm != "DELETAR") {
            return
        }

        try {

            await studentsService.deleteStudent(id)

            navigate("/dashboard",)

            toast.success("Aluno deletado com sucesso")

            onDelete?.()

        } catch (error) {
            console.error("Erro ao deletar o aluno", error);
            toast.error("Erro ao deletar o aluno")
        }

    }

    return (
        <Modal>
            <Modal.Trigger className="">
                {children}
            </Modal.Trigger>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-90">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Gear className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Deletar o aluno {name} </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="flex flex-col gap-4 justify-center items-center">
                            <p>
                                Se deseja deletar o aluno digite DELETAR abaixo.
                            </p>
                            <Input className={"w-full"} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Cancelar
                            </Button>
                            <Button slot="close" isDisabled={confirm != "DELETAR"} onClick={() => deleteStudent()} className={"bg-red-500"}>Deletar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}