'use client'
import TransactionForm from "./TransactionForm"
import { Transaction } from "@/lib/types"
import { useState } from "react"

const Transactions = () => {
    
    const [transactionState, setTransactionState] = useState<Transaction[]>([])
    
    function handleAdd (newTransaction: Transaction) { setTransactionState([ newTransaction, ...transactionState ]) }
    
    return (
        <div>
            <TransactionForm onAdd={handleAdd} />
            <p> { JSON.stringify(transactionState) } </p>
        </div>
    )
}

export default Transactions