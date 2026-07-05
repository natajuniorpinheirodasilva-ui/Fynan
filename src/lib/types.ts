export type Transaction = {
    description: string
    value: number
    type: "income" | "expense"
    category: string
    date: Date
}

