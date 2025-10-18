# Aplicação CRUD Completa

Este projeto implementa uma aplicação CRUD (Create, Read, Update, Delete) completa utilizando um backend Node.js com Express e Supabase (PostgreSQL), e um frontend Angular com Angular Material.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- `backend/`: Contém a aplicação Node.js com Express.
- `frontend/`: Contém a aplicação Angular.

## Backend (Node.js com Express e Supabase)

### Arquitetura

O backend segue uma arquitetura moderna com:

- **Rotas (`src/routes`)**: Define os endpoints da API.
- **Controladores (`src/controllers`)**: Lida com a lógica de requisição e resposta, interagindo com os serviços.
- **Serviços (`src/services`)**: Contém a lógica de negócio e a interação com o banco de dados.
- **Configuração (`src/config`)**: Gerencia a conexão com o Supabase.

### Dependências

- `express`: Framework web para Node.js.
- `dotenv`: Para carregar variáveis de ambiente do arquivo `.env`.
- `@supabase/supabase-js`: SDK oficial do Supabase para Node.js.
- `cors`: Middleware para habilitar o CORS.

### Configuração do Supabase

1.  Crie um novo projeto no [Supabase](https://supabase.com/).
2.  Obtenha a `URL` do projeto e a `anon key` (public key) nas configurações do projeto (API Settings).
3.  No diretório `backend/`, crie um arquivo `.env` com as seguintes variáveis:
    ```
    SUPABASE_URL=SUA_URL_DO_SUPABASE
    SUPABASE_KEY=SUA_ANON_KEY_DO_SUPABASE
    ```
4.  Execute o seguinte script SQL no SQL Editor do Supabase para criar a tabela `users` e configurar o RLS (Row Level Security):
    ```sql
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Opcional: Adicionar RLS (Row Level Security) para a tabela users
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Allow public read access" ON users FOR SELECT USING (true);
    CREATE POLICY "Allow authenticated users to insert" ON users FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
    CREATE POLICY "Allow authenticated users to update their own data" ON users FOR UPDATE USING (auth.uid() = id);
    CREATE POLICY "Allow authenticated users to delete their own data" ON users FOR DELETE USING (auth.uid() = id);
    ```

### Instalação e Execução (Backend)

1.  Navegue até o diretório `backend/`:
    ```bash
    cd backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor:
    ```bash
    npm start # ou node src/index.js
    ```
    O servidor estará rodando em `http://localhost:3000`.

## Frontend (Angular com Angular Material)

### Dependências

- `@angular/cli`: Ferramenta de linha de comando do Angular.
- `@angular/material`: Componentes de UI do Material Design para Angular.
- `@angular/cdk`: Component Development Kit para Angular Material.

### Instalação e Execução (Frontend)

1.  Navegue até o diretório `frontend/crud-frontend/`:
    ```bash
    cd frontend/crud-frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    ng serve --open
    ```
    A aplicação será aberta automaticamente no seu navegador em `http://localhost:4200`.

## Considerações Finais

- A entidade utilizada para o CRUD é `users`.
- O tratamento de erros e os retornos de status foram implementados no backend.
- O frontend utiliza tipagens fortes com TypeScript e componentes do Angular Material para uma interface consistente.

---
