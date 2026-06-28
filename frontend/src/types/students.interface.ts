export interface IStudent {
    id?: number;
    name: string;
    email: string;
    age: number;
    course: string;
    status: string;
    createdAt: Date
    updatedAt?: Date
    deletedAt?: Date
}
