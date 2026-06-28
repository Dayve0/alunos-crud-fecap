import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export default function authMiddleware() {
    const cookieUsuario = Cookies.get('user');

    console.log("Autenticado?", cookieUsuario);

    if (!cookieUsuario) {
        return redirect('/');
    }

    // Se existir, converte de volta para objeto e passa para a tela usar!
    return JSON.parse(cookieUsuario);

};