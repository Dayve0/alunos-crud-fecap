"use client";

import { Gear } from "@gravity-ui/icons";
import { Button, Input, Modal } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import studentsService from "../../services/students.service";
import { useNavigate } from "react-router-dom";

export function ActiveStudentModal({ children, id, name, onActivate }: { children: React.ReactNode, id: number, name: string, onActivate?: () => void }) {
    const navigate = useNavigate()
    const [confirm, setConfirm] = useState<string>("")

    async function activeStudent() {

        if (confirm != "ATIVAR") {
            return
        }

        try {

            await studentsService.activateStudent(id)

            navigate("/dashboard", { replace: true })

            toast.success("Aluno ativado com sucesso")

            onActivate?.()

        } catch (error) {
            console.error("Erro ao ativar o aluno", error);
            toast.error("Erro ao ativar o aluno")
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
                            <Modal.Heading>Ativar o aluno {name} </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="flex flex-col gap-4 justify-center items-center">
                            <p>
                                Se deseja ativar o aluno digite ATIVAR abaixo.
                            </p>
                            <Input className={"w-full"} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Cancelar
                            </Button>
                            <Button slot="close" isDisabled={confirm != "ATIVAR"} onClick={() => activeStudent()} className={"bg-green-500"}>Ativar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}