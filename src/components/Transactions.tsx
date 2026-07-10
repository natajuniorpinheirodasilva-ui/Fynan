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
            <TransactionForm onAdd={props.onAdd}/>
            <hr className="border-t border-white/10 my-6" />
        </div>
    )
}

export default Transactions