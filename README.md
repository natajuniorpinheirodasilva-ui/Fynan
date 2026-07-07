# Fynan

A personal finance web app built with Next.js as a full-stack learning project. Covers authentication, session management, protected routing, and an expense tracker with charts.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts (data visualization)
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

### Expense Tracker

- Transaction form with description, value, category, date, and income/expense toggle
- Field-level validation with error messages, re-checked on every submit
- Form resets after a successful submission
- Transactions lifted to a shared `Dashboard` component so the form, the transaction list, and the charts all read from a single source of truth
- Data aggregation layer (`lib/aggregations.ts`) that transforms the raw transaction list into chart-ready shapes:
  - `groupByCategory`: total spent/earned per category
  - `groupByMonth`: income vs. expense totals per month, sorted chronologically
- Category breakdown rendered as a pie chart (Recharts), with per-slice colors via the `shape` prop (the `Cell` component is deprecated as of Recharts 3.9+)

### UI

- Dark mode dashboard aesthetic
- Glassmorphism navbar (fixed, with user email and sign out)
- Reusable components: `Button`, `Input`, `Navbar`, `LogoutButton`, `TransactionForm`, `Transactions`, `Dashboard`, `CategoryPieChart`

## Project Structure

```
src/
  app/
    (protected)/
      layout.tsx              # Session verification + Navbar for all protected pages
      page.tsx                # Renders the Dashboard
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
    Dashboard.tsx             # Owns transaction state; feeds Transactions and the charts
    TransactionForm.tsx       # Controlled inputs, field validation, emits via onAdd
    Transactions.tsx          # Presentational: renders form + list from props
    charts/
      CategoryPieChart.tsx    # Pie chart, colored slices via the `shape` prop
  lib/
    types.ts                  # Shared TypeScript types (Transaction)
    aggregations.ts           # groupByCategory, groupByMonth
prisma/
  schema.prisma               # User and Session models
prisma.config.ts              # Prisma 7 datasource configuration
```

## Data Flow

`Dashboard` is the single owner of the transaction list (`useState<Transaction[]>`). It:

1. Passes `transactions` and `onAdd` down to `Transactions` (which renders the form and the history, but holds no state of its own).
2. Calls `groupByCategory(transactions)` and `groupByMonth(transactions)` inside `useMemo`, so aggregation only re-runs when `transactions` actually changes.
3. Passes the aggregated, chart-ready arrays down to the chart components as props.

Chart components never see raw `Transaction[]` — they only receive pre-aggregated data (e.g. `{ category: string; total: number }[]`), which keeps them reusable and free of business logic.

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
   git clone https://github.com/natajuniorpinheirodasilva-ui/Fynan.git
   cd Fynan
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
- `groupByCategory` currently mixes income and expense totals under the same category — no type filtering yet.
- Transactions only exist in client-side state; they are not yet persisted to the database.