'use client'
import TransactionForm from "./TransactionForm"
import { Transaction } from "@/lib/types"
import { useState } from "react"

const Transactions = () => {
    
    const [transactionState, setTransactionState] = useState<Transaction[]>([])
    
    function handleAdd (newTransaction: Transaction) { setTransactionState([ newTransaction, ...transactionState ]) }
    
    return (
        <div>
            <p> { JSON.stringify(transactionState) } </p>
            <TransactionForm onAdd={handleAdd} />
        </div>
    )
}

export default Transactions