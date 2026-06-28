import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import type { IUser } from '../types/users.interface';



export function useUser() {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 2. Busca o cookie pelo nome exato que você salvou no AuthService
        const cookieData = Cookies.get('user');

        function getUser() {
            if (cookieData) {
                try {
                    // 3. Converte a string de volta para objeto
                    const usuarioConvertido = JSON.parse(cookieData);
                    setUser(usuarioConvertido);
                } catch (error) {
                    console.error("Erro ao ler os dados do usuário:", error);
                    // Se o cookie estiver corrompido, é bom limpá-lo
                    Cookies.remove('user');
                }
            }

            setIsLoading(false);
        }

        getUser()

    }, []);

    return { user, isLoading };
}