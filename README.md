# Cinema Project - Catálogo de Filmes e Séries

Este é um projeto full-stack de um catálogo de filmes e séries, construído com um frontend em HTML, CSS e JavaScript puro, e um backend robusto em Node.js com Express e Prisma.

## Visão Geral da Arquitetura

O projeto é dividido em duas pastas principais:

-   `/frontend`: Contém a interface do usuário. É um projeto estático que consome a API do backend.
-   `/backend`: Contém a API RESTful, responsável pela lógica de negócio e comunicação com o banco de dados PostgreSQL.

---

## Como Rodar o Projeto Localmente

Siga estes passos para configurar e executar o ambiente de desenvolvimento na sua máquina.

### Pré-requisitos

Antes de começar, certifique-se de que você tem instalado:

-   [**Node.js**](https://nodejs.org/en/) (versão 18 ou superior)
-   [**Git**](https://git-scm.com/) para clonar o repositório.
-   Um editor de código, como o [**VS Code**](https://code.visualstudio.com/), com a extensão [**Live Server**](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

### 1. Banco de Dados (PostgreSQL na Nuvem)

Para evitar a instalação de um banco de dados local, usaremos um serviço gratuito na nuvem.

1.  **Crie uma conta**: Vá para o [Supabase](https://supabase.com/) ou [Neon](https://neon.tech/) e crie uma conta gratuita.
2.  **Crie um novo projeto**: Siga as instruções para criar um novo banco de dados PostgreSQL.
3.  **Copie a URL de Conexão**: Encontre a `connection string` ou `DATABASE_URL`. Ela se parecerá com `postgresql://user:password@host:port/database`. Guarde-a para o próximo passo.

### 2. Configurando o Backend

1.  **Clone o repositório**:
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd cinema-project/backend
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

3.  **Crie o arquivo de ambiente**:
    -   Na pasta `/backend`, crie um arquivo chamado `.env`.
    -   Dentro dele, adicione as seguintes linhas, substituindo pelos seus dados:

    ```env
    DATABASE_URL="SUA_URL_DE_CONEXAO_DO_BANCO_DE_DADOS"
    PORT=5000
    JWT_SECRET="CRIE_UMA_CHAVE_SECRETA_LONGA_E_ALEATORIA_AQUI"
    ```

4.  **Aplique a estrutura do banco de dados (Migrate)**:
    Este comando irá ler o `schema.prisma` e criar todas as tabelas no seu banco de dados na nuvem.
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Povoar o banco com dados de exemplo (Seed)**:
    Este comando executa o `seed.js` para adicionar filmes e séries ao catálogo.
    ```bash
    npx prisma db seed
    ```

6.  **Inicie o servidor do backend**:
    ```bash
    npm run dev
    ```

    O backend estará rodando em `http://localhost:5000`.

### 3. Configurando o Frontend

1.  **Abra a pasta do projeto no VS Code**.

2.  **Inicie o Live Server**:
    -   Navegue até a pasta `/frontend`.
    -   Clique com o botão direito no arquivo `index.html`.
    -   Selecione "Open with Live Server".

    Seu navegador abrirá o site, e ele já estará se comunicando com o backend que você iniciou no passo anterior. Agora você pode se cadastrar, fazer login e ver o catálogo de mídias!

---

## Scripts Disponíveis

### Backend (`/backend`)

-   `npm run dev`: Inicia o servidor em modo de desenvolvimento com auto-reload.
-   `npm start`: Inicia o servidor em modo de produção.
-   `npx prisma migrate dev`: Aplica novas migrações ao banco de dados.
-   `npx prisma db seed`: Popula o banco com os dados do `prisma/seed.js`.
-   `npx prisma studio`: Abre uma interface gráfica no navegador para visualizar e editar os dados do banco.