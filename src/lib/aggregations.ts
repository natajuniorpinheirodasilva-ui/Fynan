import { Transaction } from "./types";

export function groupByCategory(transactions: Transaction[]) {
  const totals: Record<string, { total: number; type: "income" | "expense" }> = {}

  for (const t of transactions) {
    if (!totals[t.category]) totals[t.category] = { total: 0, type: t.type }
    totals[t.category].total += t.value
  }

  return Object.entries(totals).map(([category, { total, type }]) => ({ category, total, type }))
}

export function groupByMonth (transactions: Transaction[]) {
  const totals: Record<string, { income: number; expense: number; sortKey: string }> = {}

  for (const t of transactions) {
    const sortKey = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, '0')}`
        
    if (!totals[sortKey]) totals[sortKey] = { income: 0, expense: 0, sortKey }
    totals[sortKey][t.type] += t.value 
  }

  return Object.values(totals)
    .sort( (a, b) => a.sortKey.localeCompare(b.sortKey) )
    .map(({ sortKey, ...rest }) => ({ month: sortKey, ...rest }) )
}

export function getBalance(transactions: Transaction[]): number {
  let balance = 0

  for (const t of transactions) {
    if (t.type === "income") {
      balance += t.value
    } else {
      balance -= t.value
    }
  }

  return balance
}