export type Transaction = {
    description: string
    value: number | string
    type: "income" | "expense"
    category: string
    date: Date
}

