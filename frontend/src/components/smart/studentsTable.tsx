import { Archive, CirclePlusFill, PencilToSquare, TrashBin } from '@gravity-ui/icons';
import { Button, Chip, EmptyState, Link, Spinner, Table } from "@heroui/react";
import type { IStudent } from '../../types/students.interface';
import { ActiveStudentModal } from '../modal/activateModal';
import { DeleteStudentModal } from '../modal/deleteModal';

export function StudentsTable({ students, isLoading, onAction }: { students: IStudent[], isLoading: boolean, onAction?: () => void }) {


    if (isLoading) {
        return <Spinner />
    }

    return (
        <Table className="max-w-full w-full min-h-full max-h-80 border border-default-200 bg-white">
            <Table.ScrollContainer>
                <Table.Content aria-label="Team members" className="min-w-150 p-2 bg-white" >
                    <Table.Header className={"bg-white"}>
                        {[
                            { title: "Nome" },
                            { title: "Email" },
                            { title: "Curso" },
                            { title: "Status" },
                            { title: "Ação" },
                        ].map((t, index) => (
                            <Table.Column key={t.title} isRowHeader={index == 0} className={"text-base"}>{t.title}</Table.Column>
                        ))}
                    </Table.Header>
                    <Table.Body
                        items={students}
                        renderEmptyState={() => (
                            <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                                <Archive />
                                <span className="text-sm text-muted">Nenhum resultado encontrado</span>
                            </EmptyState>
                        )}
                    >
                        {students.map((student) => {
                            return (
                                <Table.Row key={student.id}>
                                    <Table.Cell>{student.name}</Table.Cell>
                                    <Table.Cell>{student.email}</Table.Cell>
                                    <Table.Cell>{student.course}</Table.Cell>
                                    <Table.Cell>
                                        <Chip className={`font-bold ${student.status === 'ATIVO' ? "text-success" : "text-danger"}`}>
                                            {student.status}
                                        </Chip>
                                    </Table.Cell>
                                    <Table.Cell className={"flex flex-row gap-3"}>
                                        <div title='Editar'>
                                            <Link href={`/dashboard/alunos/${student.id}/editar`} className={"rounded-full w-9 h-9 flex justify-center items-center text-white bg-blue-500"}>
                                                <PencilToSquare />
                                            </Link>

                                        </div>

                                        {student.status === "ATIVO" ?
                                            (
                                                <div title='Deletar'>
                                                    <DeleteStudentModal id={student.id!} name={student.name} onDelete={onAction}>
                                                        <Button isIconOnly className={"bg-danger"}><TrashBin /></Button>
                                                    </DeleteStudentModal>
                                                </div>
                                            ) : (
                                                <div title='Ativar'>
                                                    <ActiveStudentModal id={student.id!} name={student.name} onActivate={onAction}>
                                                        <Button isIconOnly className={"bg-success"}><CirclePlusFill /></Button>
                                                    </ActiveStudentModal>
                                                </div>
                                            )
                                        }


                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
}