import { Check } from '@gravity-ui/icons';
import { Button, FieldError, Form, Input, Label, Link, TextField } from "@heroui/react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMGLogo from '../assets/logo_fecap.png';
import AuthLayout from "../layouts/auth.layout";
import authService from '../services/auth.service';
export default function LoginPage() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate()

    async function loggin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {

            await authService.login(email, password);

            navigate("/dashboard", { replace: true })

        } catch (error) {
            console.error("Erro ao entrar ", error);

        };
    }

    return (
        <AuthLayout>
            <div className="flex flex-col gap-10 -mt-5 justify-center items-center">

                <img src={IMGLogo} className='w-50 h-50 select-none' />

                <Form className="flex w-96 h-fit flex-col gap-4  shadow-[0_3px_25px_rgba(0,0,0,0.25)] shadow-[#12632ec9]  p-4 rounded-2xl" onSubmit={loggin}>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        isInvalid={
                            ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) && email != "") ? true : false
                        }
                    >
                        <Label>Email</Label>
                        <Input placeholder="email@exemplo.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                        isInvalid={
                            password.length > 0 && password.length < 8
                        }
                    >
                        <Label>Senha</Label>
                        <Input id='password' placeholder="Digite sua senha" />
                        <FieldError> A senha precisa conter no minimo 8 caracteres</FieldError >
                    </TextField>

                    <Button type="submit" className="bg-[#12632e] w-full" isDisabled={email == "" || password == ""}>
                        <Check />
                        Entrar
                    </Button>
                </Form>
            </div>
            <Link className="text-sm " href='/register'>Ainda não possui cadastro? Clique aqui</Link>
        </AuthLayout >
    )
};