'use client'
import { Transaction } from "@/lib/types"
import { useState } from "react"

const Transactions = () => {
    const [transactionState, setTransactionState] = useState<Transaction[]>([])
    return (
        <div>
            <p> { JSON.stringify(transactionState) } </p>
        </div>
    )
}

export default Transactions