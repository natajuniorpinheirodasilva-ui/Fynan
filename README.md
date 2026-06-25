# Next Project

A full-stack authentication system built with Next.js, used as a learning project to practice frontend/backend integration, database modeling, and API security fundamentals.

## Overview

The project implements user registration and login with validation on both the client and server, persisted to a SQLite database through Prisma ORM. On successful authentication, the user is redirected to the home page.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma ORM 7 (with `@prisma/adapter-better-sqlite3` driver adapter)
- SQLite

## Features

### Sign Up (`/sign_up`)
- Client-side validation: empty fields, password confirmation match
- Server-side validation (independent of the client):
  - Empty email, password, or repeat password
  - Password and repeat password mismatch
  - Duplicate email check via `findUnique`
- Returns `401` with a descriptive error message on validation failure
- Returns the created user without the password field on success
- Redirects to `/` on success

### Sign In (`/sign_in`)
- Client-side validation: empty fields
- Server-side validation:
  - Empty email or password
  - User lookup by email
  - Password comparison
  - All failure cases return a generic `"Invalid credentials"` message with status `401`, to avoid leaking whether the email exists in the database
- Returns the authenticated user without the password field on success
- Redirects to `/` on success

### Known limitations
- Passwords are stored in plain text. Hashing (e.g. with `bcrypt`) has not been implemented yet.
- There is no session or token-based authentication. The home page is not protected and does not require a valid session to access.
- SQLite is used as a local development database. It is not suitable for serverless deployment targets (e.g. Vercel) without an external persistent database, since the filesystem is ephemeral in that environment.

## Project Structure

```
src/
  app/
    page.tsx                  # Home page
    sign_in/page.tsx          # Sign in form
    sign_up/page.tsx          # Sign up form
    api/
      sign_in/route.ts        # Sign in endpoint
      sign_up/route.ts        # Sign up endpoint
  components/
    Input.tsx                 # Reusable input field
    Button.tsx                # Reusable button
prisma/
  schema.prisma                # User model definition
prisma.config.ts               # Prisma 7 configuration (datasource URL)
```

## Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/natajuniorpinheirodasilva-ui/Next-Project.git
   cd Next-Project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the environment file:
   ```bash
   cp .env.example .env
   ```
   The default value works out of the box for local SQLite usage.

4. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
   This creates `dev.db` with the `User` table. The database starts empty; an account must be created via the sign up page before testing sign in.

6. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

### Build

The build script runs `prisma generate` before `next build`, so the Prisma Client is always regenerated in fresh environments (e.g. CI/CD, Vercel) where the generated client is not committed to version control:

```bash
npm run build
```

## Roadmap

- [ ] Display server-side validation errors in the UI
- [ ] Hash passwords before storing them
- [ ] Add session/token-based authentication
- [ ] Protect the home page behind authentication
- [ ] Build out the dashboard