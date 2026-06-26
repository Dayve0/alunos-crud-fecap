### Crud Alunos FECAP

---

#### A Fazer - backend

 - [x] Controllers
    - [x] Alunos
    - [x] Usuários
    - [x] Auth

####
 - [x] Services
    - [x] Alunos
        - [x] GetAll
        - [x] GetByID
        - [x] GetByEmail
        - [x] Create
            - Verificar se aluno já existe
        - [x] Update
            - Verificar se aluno existe
        - [x] Delete
            - Verificar se aluno existe
            
    ---

    - [x] Usuários
        - [x] GetAll
        - [x] GetByID
        - [x] GetByEmail
        - [x] Create
            - Verificar se usuário já existe
        - [x] Update
            - Atualizar por ID
            - Verificar se usuário existe
        - [x] Delete
            - Deletar por ID
            - Verificar se usuário existe

    ---

    - [x] Auth
        - [x] Register
            - Verificar se palavra chave está na requisição
            - Verificar se o usuário já existe
            - Enviar senha pré-definida para email do usuário
        - [x] Login
            - Verificar se o usuário já existe
        - [x] ForgetPassword
            - Verificar se o usuário já existe
            - Verificar se palavra chave está na requisição

####
 - [x] Repositories
    - [x] Alunos
    - [x] Usuários
    - [x] Auth

####
 - [x] Middlewares
    - [x] Auth
        - Verificar nivel de autorização
    - [x] Error
        - Verificar se erro genérico/inesperado

---

#### A Fazer - frontend 