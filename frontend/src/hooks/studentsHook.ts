import { useState } from 'react';
import type { IStudent } from '../types/students.interface';



export function useStudent() {
    const [students, setStudents] = useState<IStudent[]>([])
    const [student, setStudent] = useState<Partial<IStudent>>({});


    return { student, setStudent, students, setStudents };
}