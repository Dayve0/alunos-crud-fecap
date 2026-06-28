import { Check } from '@gravity-ui/icons';
import { Button, Description, FieldError, Form, Input, Label, Link, TextField } from "@heroui/react";
import { useState } from 'react';
import IMGLogo from '../assets/logo_fecap.png';
import AuthLayout from "../layouts/auth.layout";
import authService from '../services/auth.service';
export default function RegisterPage() {

    const [email, setEmail] = useState<string>("");
    const [acessPassword, setAcessPassword] = useState<string>("");

    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await authService.register(email, acessPassword);

        console.log("Dados enviados", { email, acessPassword });

    };

    return (
        <AuthLayout>
            <div className="flex flex-col gap-10 -mt-5 justify-center items-center">

                <img src={IMGLogo} className='w-50 h-50 select-none' />

                <Form className="flex w-96 h-fit flex-col gap-4  shadow-[0_3px_25px_rgba(0,0,0,0.25)] shadow-[#12632ec9]  p-4 rounded-2xl" onSubmit={register}>
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
                        name="acessPassword"
                        type="password"
                        value={acessPassword}
                        onChange={setAcessPassword}
                    >
                        <Label>Palavra-Chave</Label>
                        <Input id='acessPassword' placeholder="Digite a palavra chave" />
                        <Description> É necessária uma palavra chave para se cadastrar no sistema </Description >
                    </TextField>

                    <Button type="submit" className="bg-[#12632e] w-full" isDisabled={email == "" || acessPassword == ""}>
                        <Check />
                        Entrar
                    </Button>
                </Form>


            </div>
            <Link className="text-sm" href='/'>Já possui cadastro? Clique aqui para entrar</Link>
        </AuthLayout >
    )
};