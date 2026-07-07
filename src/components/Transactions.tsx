'use client'
import TransactionForm from "./TransactionForm"
import { Transaction } from "@/lib/types"

type Props = {
    transactions: Transaction[],
    onAdd: (transaction: Transaction) => void
}

const Transactions = (props: Props) => {
        
    return (
        <div>
            <TransactionForm onAdd={props.onAdd} />
            <p> { JSON.stringify(props.transactions) } </p>
        </div>
    )
}

export default Transactions