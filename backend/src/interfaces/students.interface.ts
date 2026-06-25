// Interface do estudante

export interface IStudent {
    id: number;
    name: string;
    email: string;
    course: string;
    status?: string;
    createdAt?: Date;
    deletedAt?: Date;
}