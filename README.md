# Fynan

This is likely the final commit on this project. Fynan was built as a learning project while studying Analysis and Systems Development (ADS) at FATEC Botucatu, and it served its purpose well. Through it, I practiced full stack development with Next.js, authentication and session handling, database modeling with Prisma, state management patterns in React, data aggregation logic, and data visualization with Recharts. I am leaving the codebase as is, warts and all, as a record of that learning process rather than polishing it further.

## What This Project Is

A personal finance web app. Users can sign up, log in, add income and expense transactions, and see that data reflected in charts and a running balance. It is not production ready, and it was never meant to be, its purpose was to give me hands on practice with real, connected pieces of a web application instead of isolated tutorials.

## Tech Stack

- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts (data visualization)
- Prisma ORM 7 with `@prisma/adapter-better-sqlite3`
- SQLite

## What I Learned Building This

### Authentication and Sessions

I implemented sign up and sign in with email and password, validated independently on both the client and the server. Sessions are cookie based (`httpOnly`), created on login and deleted on logout, and stored in the database with an `expiresAt` timestamp. Every protected page checks the session through a shared layout before rendering anything, so I only had to write that verification logic once. Error responses intentionally use a generic message ("Invalid credentials") instead of specific ones, to avoid revealing whether a given email is registered.

### State Management and Component Design

This project is where I actually understood, not just memorized, the idea of lifting state up. Transactions started out living inside the form component itself, which worked until I needed the same data in a chart component too. Moving that state up to a shared `Dashboard` component, and having the form and charts receive it through props instead of each managing their own copy, was one of the clearest lessons of the whole project: components that only receive data and render it are easier to reuse and reason about than components that both hold and display data.

### Data Aggregation

`lib/aggregations.ts` holds a small set of pure functions that transform a raw transaction list into whatever shape a specific chart needs, grouped by category, grouped by month, or reduced into a single running balance. Keeping these functions separate from any component, and memoizing their results with `useMemo` so they only recompute when the transaction list actually changes, was a deliberate choice to keep business logic and UI logic apart.

### Data Visualization

I went through four different chart types with Recharts on the same underlying data: a pie chart, a bar chart, a line chart, and a radar chart, mainly to understand how Recharts' composition model works (container components like `PieChart` or `BarChart` versus the drawing components like `Pie`, `Bar`, or `Line` that go inside them, and how props like `data` and `dataKey` belong to different levels of that hierarchy depending on chart type). Styling the tooltips, axes, and colors to match a dark theme, since Recharts defaults to light mode styling, was its own small lesson in reading a library's actual rendering behavior instead of assuming it inherits page styles automatically.

## Project Structure

```
src/
  app/
    (protected)/
      layout.tsx              # Session verification, fonts, and Navbar for all protected pages
      page.tsx                # Renders the Dashboard, background GIF and hero text
      new_transaction/
        page.tsx               # Placeholder, not implemented
    api/
      sign_in/route.ts        # Login endpoint
      sign_up/route.ts        # Register endpoint
      logout/route.ts         # Logout endpoint
    layout.tsx                 # Root layout (fonts applied here too, for sign in and sign up pages)
    sign_in/page.tsx           # Sign in form
    sign_up/page.tsx           # Sign up form
    globals.css                 # Tailwind theme tokens, font variables, glow animation
  components/
    Button.tsx
    Input.tsx
    Navbar.tsx
    LogoutButton.tsx
    Dashboard.tsx               # Owns transaction state, feeds the form and every chart
    TransactionForm.tsx         # Controlled inputs, field validation, emits through onAdd
    Transactions.tsx            # Renders the form (a full transaction list view was never finished)
    TransactionList.tsx         # Placeholder, not implemented
    charts/
      CategoryPieChart.tsx      # Pie chart, colored by transaction type (income or expense)
      CategoryRadarChart.tsx    # Radar chart, one spoke per category
      MonthlyBarChart.tsx       # Grouped bar chart, income vs expense per month
      MonthlyLineChart.tsx      # Line chart, income vs expense per month
  lib/
    types.ts                    # Shared TypeScript types (Transaction)
    aggregations.ts              # groupByCategory, groupByMonth, getBalance
prisma/
  schema.prisma                 # User and Session models
prisma.config.ts                # Prisma 7 datasource configuration
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

The app will be available at `http://localhost:3000`. The database starts empty, create an account through the sign up page before testing sign in.

## Known Limitations

These were never fixed, and I am listing them honestly rather than hiding them:

- Passwords are stored and compared in plain text, no hashing was implemented
- Session `expiresAt` is stored but never checked during validation, expired sessions are still treated as valid
- SQLite will not work on serverless deployments such as Vercel without an external persistent database
- Transactions only live in client side state, they are lost on every page refresh, nothing is persisted to the database
- `TransactionList.tsx` and `new_transaction/page.tsx` exist as empty placeholders
- `groupByCategory` picks one type per category based on whichever transaction it encounters first, a category with mixed income and expense entries under the same name would be misrepresented