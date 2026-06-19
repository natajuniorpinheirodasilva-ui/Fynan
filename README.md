# Next Project

Projeto de estudo em **Next.js** com foco em autenticação (cadastro e login), construído do zero como prática de fullstack com TypeScript, Prisma e SQLite.

## Status atual

- ✅ Páginas de **Sign up** e **Sign in** com validação no frontend
- ✅ API de cadastro (`/api/sign_up`) integrada ao banco via Prisma
  - Validação de campos vazios
  - Verificação de senhas coincidentes
  - Verificação de e-mail duplicado
  - Senha removida da resposta da API
- 🚧 API de login (`/api/sign_in`) — ainda não integrada ao banco
- 🚧 Exibição de erros do backend na tela (atualmente só aparece no console)
- 🚧 Dashboard pós-login — não implementado ainda

## Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- [Prisma ORM 7](https://www.prisma.io/) com driver adapter (`@prisma/adapter-better-sqlite3`)
- SQLite (banco local, arquivo `dev.db`)

## Como rodar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/natajuniorpinheirodasilva-ui/Next-Project.git
cd Next-Project
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

O valor padrão já funciona para rodar localmente com SQLite, não é necessário alterar nada.

### 4. Gerar o Prisma Client

```bash
npx prisma generate
```

### 5. Criar o banco de dados local

```bash
npx prisma migrate dev
```

Isso cria o arquivo `dev.db` com a tabela `User` já estruturada. O banco local começa **vazio** — você vai precisar se cadastrar pela tela de Sign up antes de testar o login.

### 6. Rodar o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura do projeto

```
src/
  app/
    page.tsx              # Home
    sign_in/page.tsx      # Tela de login
    sign_up/page.tsx      # Tela de cadastro
    api/
      sign_in/route.ts    # API de login (em construção)
      sign_up/route.ts    # API de cadastro
  components/
    Input.tsx             # Input reutilizável
    Button.tsx             # Botão reutilizável
prisma/
  schema.prisma           # Definição do model User
```

## Notas de segurança (projeto em aprendizado)

Este projeto está em fase de aprendizado, então alguns pontos ainda **não** seguem práticas de produção:

- As senhas são salvas **em texto puro** no banco (sem hash). Isso será corrigido com `bcrypt` em uma próxima etapa.
- Não há autenticação por sessão/token ainda — o login apenas valida credenciais.
