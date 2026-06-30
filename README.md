# Fynan

A personal finance web app built with Next.js as a full-stack learning project. Covers authentication, session management, protected routing, and an expense tracker (in progress).

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma ORM 7 with `@prisma/adapter-better-sqlite3`
- SQLite

## Features

### Authentication
- Sign up with email and password
- Client-side and server-side validation (independent layers)
- Passwords checked for match and empty fields before hitting the database
- Duplicate email detection
- All error responses use generic messages to avoid user enumeration

### Session Management
- Cookie-based sessions stored in the database (`httpOnly` cookie)
- Sessions created on login, deleted on logout
- Session validated on every protected page load
- Expired or tampered cookies redirect to sign in

### Protected Routes
- Route group `(protected)` with a shared layout that handles session verification
- Any unauthenticated access redirects to `/sign_in` automatically
- No repeated auth logic across pages

### Expense Tracker (in progress)
- Transaction form with description, value, category, and income/expense toggle
- Client-side state management with `useState`
- Form resets after submission
- Transaction list rendering (in progress)
- Summary cards and charts (planned)

### UI
- Dark mode dashboard aesthetic
- Glassmorphism navbar (fixed, with user email and sign out)
- Reusable components: `Button`, `Input`, `Navbar`, `LogoutButton`, `TransactionForm`, `Transactions`

## Project Structure

```
src/
  app/
    (protected)/
      layout.tsx              # Session verification + Navbar for all protected pages
      page.tsx                # Home / dashboard
      new_transaction/
        page.tsx              # New transaction page (currently unused)
    api/
      sign_in/route.ts        # Login endpoint
      sign_up/route.ts        # Register endpoint
      logout/route.ts         # Logout endpoint
    sign_in/page.tsx          # Sign in form
    sign_up/page.tsx          # Sign up form
  components/
    Button.tsx
    Input.tsx
    Navbar.tsx
    LogoutButton.tsx
    TransactionForm.tsx
    Transactions.tsx
  lib/
    types.ts                  # Shared TypeScript types (Transaction)
prisma/
  schema.prisma               # User and Session models
prisma.config.ts              # Prisma 7 datasource configuration
```

## Database Schema

```prisma
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  password  String
  createdAt DateTime  @default(now())
  session   Session[]
}

model Session {
  id        String   @id @default(cuid())
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  expiresAt DateTime
}
```

## Getting Started

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

4. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`. The database starts empty — create an account via the sign up page before testing sign in.

## Known Limitations

- Passwords are stored in plain text. Hashing (e.g. bcrypt) has not been implemented yet.
- Session expiry is stored in the database but not yet enforced on validation.
- SQLite is not suitable for serverless deployments (e.g. Vercel) without an external persistent database.

## Roadmap

- [ ] Hash passwords with bcrypt
- [ ] Enforce session expiry on validation
- [ ] Transaction list UI
- [ ] Summary cards (total income, total expense, balance)
- [ ] Charts with Recharts
- [ ] Migrate to PostgreSQL for production