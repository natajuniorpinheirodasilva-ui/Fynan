'use client'
import { useMemo, useState } from "react"
import { Transaction } from "@/lib/types"
import { groupByCategory, groupByMonth } from "@/lib/aggregations"
import Transactions from "./Transactions"
import CategoryPieChart from "./charts/CategoryPieChart"
import MonthlyBarChart from "./charts/MonthlyBarChart"

const Dashboard = () => {
    const [transactionState, setTransactionState] = useState<Transaction[]>([])
    
    const handleAdd = (newTransaction: Transaction) => { setTransactionState([ newTransaction, ...transactionState ]) }

    const cachedCategoryValue = useMemo(() => groupByCategory(transactionState), [transactionState])
    const cachedMonthlyValue = useMemo(() => groupByMonth(transactionState), [transactionState] )

    return (
        <div className="flex flex-col items-center " >
            <Transactions onAdd={handleAdd} transactions={transactionState}/>
            <div className="flex gap-8">
                <CategoryPieChart data={cachedCategoryValue}/>
                <MonthlyBarChart data={cachedMonthlyValue}/>
            </div>
        </div>
    )
}

export default Dashboard