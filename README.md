# Fynan

A personal finance web app built with Next.js as a full-stack learning project. Covers authentication, session management, protected routing, and an expense tracker with charts.

## Tech Stack

- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts (data visualization)
- Prisma ORM 7 with `@prisma/adapter-better-sqlite3`
- SQLite

## Features

### Authentication

- Sign up with email and password (with password confirmation)
- Client-side and server-side validation, checked independently on each layer
- Duplicate email detection
- All error responses use a generic "Invalid credentials" message, avoiding user enumeration

### Session Management

- Cookie-based sessions (`httpOnly`), created on login and deleted on logout
- Sessions stored in the database with an `expiresAt` timestamp (7-day expiry set on creation)
- Session validated on every protected page load via the `(protected)` layout
- Missing or invalid session cookies redirect to `/sign_in`

### Protected Routes

- Route group `(protected)` with a shared layout that verifies the session before rendering any child page
- Applies the app's fonts (Space Grotesk, Inter, JetBrains Mono) and renders the `Navbar`
- No repeated auth logic across pages

### Expense Tracker

- Transaction form with description, value, category, date, and an income/expense toggle
- Field-level validation, recomputed on every submit, with error messages rendered below the form
- Form resets after a successful submission
- Transaction state lives in `Dashboard`, the single source of truth shared by the form, the transaction list, and all charts (lifted state, not duplicated per component)
- Aggregation layer (`lib/aggregations.ts`), pure functions with no UI or state logic:
  - `groupByCategory`: totals per category (mixes income and expense today, no type filter yet)
  - `groupByMonth`: income vs. expense totals per calendar month, sorted chronologically by a normalized `YYYY-MM` key
- Aggregation is memoized with `useMemo`, so it only recalculates when the transaction list actually changes
- Three chart types built on the same monthly/category data, each demonstrating a different Recharts composition pattern:
  - **Pie chart** (spending by category), with per-slice colors via the `shape` prop (the `Cell` component is deprecated as of Recharts 3.9+)
  - **Bar chart** (income vs. expense per month), grouped bars
  - **Line chart** (income vs. expense per month), smooth curves with custom dot styling

### UI

- Dark, glassmorphism aesthetic throughout, with a looping background GIF behind the main content
- Custom type system: Space Grotesk for display/headings, Inter for body text, JetBrains Mono for numeric/tabular data (dates, values)
- Fixed navbar with backdrop blur, app name, user email, and logout
- Charts and tooltips styled to match the dark theme (Recharts' default tooltip/axis colors are light-mode by default and don't inherit page theme automatically)
- Reusable components: `Button`, `Input`, `Navbar`, `LogoutButton`, `TransactionForm`, `Transactions`, `Dashboard`, and three chart components under `components/charts/`

## Project Structure

```
src/
  app/
    (protected)/
      layout.tsx              # Session verification, fonts, and Navbar for all protected pages
      page.tsx                # Renders the Dashboard, background GIF + hero text
      new_transaction/
        page.tsx               # Placeholder, not yet implemented
    api/
      sign_in/route.ts        # Login endpoint
      sign_up/route.ts        # Register endpoint
      logout/route.ts         # Logout endpoint
    layout.tsx                 # Root layout (fonts applied here too, for sign in/up pages)
    sign_in/page.tsx           # Sign in form
    sign_up/page.tsx           # Sign up form
    globals.css                 # Tailwind theme tokens, font variables, glow-card animation
  components/
    Button.tsx
    Input.tsx
    Navbar.tsx
    LogoutButton.tsx
    Dashboard.tsx               # Owns transaction state; feeds Transactions and all three charts
    TransactionForm.tsx         # Controlled inputs, field validation, emits via onAdd
    Transactions.tsx            # Renders the form (transaction list display still pending)
    TransactionList.tsx         # Placeholder, not yet implemented
    charts/
      CategoryPieChart.tsx      # Pie chart, colored slices via the `shape` prop
      MonthlyBarChart.tsx       # Grouped bar chart, income vs. expense per month
      MonthlyLineChart.tsx      # Line chart, income vs. expense per month
  lib/
    types.ts                    # Shared TypeScript types (Transaction)
    aggregations.ts              # groupByCategory, groupByMonth
prisma/
  schema.prisma                 # User and Session models
prisma.config.ts                # Prisma 7 datasource configuration
```

## Data Flow

`Dashboard` is the single owner of the transaction list (`useState<Transaction[]>`). It:

1. Passes `transactions` and `onAdd` down to `Transactions`, which renders the form (it holds no state of its own, it's a controlled/presentational component).
2. Calls `groupByCategory(transactions)` and `groupByMonth(transactions)` inside `useMemo`, so aggregation only re-runs when `transactions` actually changes.
3. Passes the aggregated, chart-ready arrays down to all three chart components as props.

Chart components never see raw `Transaction[]`, they only receive pre-aggregated data (e.g. `{ category: string; total: number }[]` or `{ month: string; income: number; expense: number }[]`), which keeps them reusable and free of business logic.

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

The app will be available at `http://localhost:3000`. The database starts empty, create an account via the sign up page before testing sign in.

## Known Limitations

- Passwords are stored and compared in plain text, no hashing implemented yet
- Session `expiresAt` is stored but not enforced during validation, expired sessions are still treated as valid
- SQLite is not suitable for serverless deployments (e.g. Vercel) without an external persistent database
- `groupByCategory` mixes income and expense totals under the same category, no type filtering yet
- Transactions only exist in client-side state, they are lost on page refresh, not yet persisted to the database
- `TransactionList.tsx` and `new_transaction/page.tsx` exist as placeholders and are not implemented