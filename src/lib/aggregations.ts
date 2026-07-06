import { Transaction } from "./types";

export function groupByCategory (transactions: Transaction[]) {
    const totals: Record<string, number> = {}

    for (const t of transactions) {
        totals[t.category] = (totals[t.category] ?? 0) + t.value
    }

    return Object.entries(totals).map(([category, total]) => ({ category, total }))
    
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