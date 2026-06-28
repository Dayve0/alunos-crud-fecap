#  Sistema de Gerenciamento de Alunos

> Projeto desenvolvido como solução para a **Etapa Prática do Processo Seletivo de Programador - FECAP 2026**.

Este repositório contém uma aplicação Full Stack para gerenciamento de alunos, desenvolvida utilizando **React + TypeScript** no frontend e **Node.js + Express + TypeScript** no backend, comunicando-se através de uma API REST.

---

# Objetivo

Desenvolver uma aplicação CRUD para gerenciamento de alunos seguindo os requisitos propostos pela FECAP.

A aplicação permite:

* cadastrar alunos;
* listar alunos;
* editar alunos;
* excluir alunos;
* consumir uma API REST;
* validar dados no frontend e backend;
* organizar o código por responsabilidade.

Embora o desafio sugerisse uma implementação simples, optei por adicionar algumas funcionalidades extras visando tornar o projeto mais completo e demonstrar conhecimentos além do escopo mínimo solicitado.

---

# Tecnologias utilizadas

## Frontend

* React
* TypeScript
* Vite
* React Router DOM
* HeroUI
* Tailwind CSS
* Axios
* React Toastify
* JS Cookie
* Gravity UI Icons
* TypeScript & ESLint

## Backend

* Node.js
* Express
* TypeScript
* Prisma ORM (prisma, @prisma/client)
* SQLite (sqlite3, @prisma/adapter-better-sqlite3)
* Bcrypt (bcrypt)
* CORS
* Cookie Parser 
* Dotenv 
* Nodemailer
* TSX 

## Banco de Dados

* SQLlite

---

#  Funcionalidades

* ✅ Login
* ✅ Dashboard
* ✅ Cadastro de alunos
* ✅ Listagem de alunos
* ✅ Atualização de alunos
* ✅ Exclusão de alunos
* ✅ Validação de formulários
* ✅ Validação de idade mínima
* ✅ Tratamento de erros
* ✅ Estados de carregamento
* ✅ Mensagens de sucesso e erro
* ✅ Estatísticas de alunos
* ✅ Quantidade de alunos por curso
* ✅ Organização por componentes reutilizáveis

---

# ✔ Requisitos atendidos

| Requisito                     | Status |
| ----------------------------- | :----: |
| React + TypeScript            |    ✅   |
| Express + TypeScript          |    ✅   |
| CRUD Completo                 |    ✅   |
| API REST                      |    ✅   |
| Listagem de alunos            |    ✅   |
| Cadastro                      |    ✅   |
| Atualização                   |    ✅   |
| Exclusão                      |    ✅   |
| Validação no frontend         |    ✅   |
| Validação no backend          |    ✅   |
| Estado de loading             |    ✅   |
| Estado vazio                  |    ✅   |
| Tratamento de erros           |    ✅   |
| Confirmação antes da exclusão |    ✅   |
| README                        |    ✅   |

---

# ⭐ Diferenciais implementados

Além do que foi solicitado no desafio, foram implementadas algumas melhorias:

* Dashboard inicial.
* Sistema de autenticação.
* Banco de dados relacional.
* Organização em componentes reutilizáveis.
* Separação das responsabilidades da aplicação.
* Tipagem completa utilizando TypeScript.
* Estatísticas de alunos cadastrados.
* Contagem de alunos ativos e inativos.
* Quantidade de alunos por curso.
* Utilização do HeroUI para construção da interface.
* Notificações utilizando React Toastify.

---

# 📁 Estrutura do projeto

```text
alunos-crud-fecap
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── services
│   │   ├── middlewares
│   │   ├── models
│   │   ├── interfaces
│   │   └── index.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── contexts
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── types
│   │   ├── utils
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# 🏛 Organização da aplicação

## Frontend

O frontend foi organizado separando responsabilidades para facilitar manutenção e reutilização de código.

* **components** → Componentes reutilizáveis.
* **pages** → Telas da aplicação.
* **services** → Comunicação com a API.
* **hooks** → Hooks personalizados.
* **routes** → Configuração das rotas.
* **types** → Interfaces e tipos TypeScript.
* **middlewares** → Para autenticação e erro.
* **config** → Configurações de libs
* **layouts** → Estruturas compartilhadas entre páginas.

---

## Backend

O backend foi organizado em camadas para separar responsabilidades.

* **routes** → Definição das rotas.
* **controllers** → Recebimento das requisições HTTP.
* **services** → Regras de negócio.
* **repositories** → Abstrações para o uso do ORM.
* **middlewares** → Validações e interceptação de requisições.
* **database** → Configuração da conexão com o banco.
* **types** → Tipos de funções
* **lib** → Configuração de libs
* **utils** → Funções a serem reutilizadas
* **interfaces** → Representações das entidades do banco

---

# ▶ Como executar o projeto

## Pré-requisitos

* Node.js 20+
* npm

---

## 1 - Clonar o projeto

```bash
git clone https://github.com/Dayve0/alunos-crud-fecap.git

cd alunos-crud-fecap
```

---

## 2 - Executar o Backend

Abra um terminal.

```bash
cd backend

npm install

npx prisma generate

npx prisma db push

npm run dev
```
O backend será iniciado em:

```
http://localhost:3001
```

---

## 3 - Executar o Frontend

Abra outro terminal.

```bash
cd frontend

npm install

npm run dev
```

O frontend será iniciado em:

```text
http://localhost:5173
```

---

# 🔌 API REST - Básica

| Método | Endpoint        | Descrição             |
| ------ | --------------- | --------------------- |
| GET    | /api/alunos     | Lista todos os alunos |
| GET    | /api/alunos/:id | Busca um aluno        |
| GET    | /api/alunos/active/:id | Ativa um aluno |
| POST   | /api/alunos     | Cria um aluno         |
| PUT    | /api/alunos/:id | Atualiza um aluno     |
| DELETE | /api/alunos/:id | Remove/Desativa um aluno |

---

# 📚 Perguntas Teóricas

## 1. Diferença entre tipos explícitos e inferência de tipos.

Tipos explícitos são aqueles que o programador declara manualmente. Inferência de tipos é quando o a linguagem detecta sozinha o tipo da variável com base no valor dela.

---

## 2. O que é async/await?

É uma forma de trabalhar com operações assíncronas de maneira mais legível. Serve para facilitar o tratamento de Promises e erros.

---

## 3. Fluxo de uma requisição HTTP.

O frontend envia uma requisição para um endpoint da API. O backend recebe essa requisição, executa as regras de negócio necessárias, consulta ou altera os dados e retorna uma resposta em formato JSON. O frontend recebe essa resposta e atualiza a interface conforme o resultado.

---

## 4. Diferença entre GET e POST.

O método **GET** é utilizado para consultar informações sem alterar dados. O método **POST** é utilizado para enviar dados ao servidor, normalmente para criar novos registros.

---

## 5. Como tratar uma requisição demorada?

Acredito que o certo seja exibir um indicador de carregamento para informar que a operação está em andamento.

---

# Observações

Durante o desenvolvimento deste desafio utilizei Inteligência Artificial como ferramenta de apoio para estruturar esta documentação e organizar seu conteúdo.

Todo o desenvolvimento da aplicação, implementação das funcionalidades, arquitetura do projeto, integração entre frontend e backend e regras de negócio foram realizados por mim. O uso da IA foi restrito ao auxílio na elaboração deste README, conforme permitido no escopo do processo seletivo.

---

# Autor

**Dayverson Silva Miranda**

GitHub: https://github.com/Dayve0
