'use client'
import { useMemo, useState } from "react"
import { Transaction } from "@/lib/types"
import { groupByCategory, groupByMonth, getBalance } from "@/lib/aggregations"
import Transactions from "./Transactions"
import CategoryPieChart from "./charts/CategoryPieChart"
import MonthlyBarChart from "./charts/MonthlyBarChart"
import MonthlyLineChart from "./charts/MonthlyLineChart"
import CategoryRadarChart from "./charts/CategoryRadarChart"

const Dashboard = () => {
    const [transactionState, setTransactionState] = useState<Transaction[]>([])
    
    const handleAdd = (newTransaction: Transaction) => { setTransactionState([ newTransaction, ...transactionState ]) }

    const cachedCategoryValue = useMemo(() => groupByCategory(transactionState), [transactionState])
    const cachedMonthlyValue = useMemo(() => groupByMonth(transactionState), [transactionState] )
    const cachedBalance = useMemo(() => getBalance(transactionState), [transactionState])

return (
  <div className="flex flex-col items-center gap-16 w-full">
    <Transactions onAdd={handleAdd} transactions={transactionState}/>
    <div className="w-full max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs tracking-[0.2em] text-cyan-400/70 uppercase">Overview</span>
        <div className="h-px flex-1 bg-white/10" />
        <p className={`font-mono text-2xl font-bold mt-1 ${cachedBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}> $ {cachedBalance.toFixed(2)} </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md p-6">
          <h2 className="font-display text-sm font-semibold text-white/80 mb-4">By Category</h2>
          <CategoryPieChart data={cachedCategoryValue}/>
          <CategoryRadarChart data={cachedCategoryValue} />
        </div>
        <div className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md p-6">
          <h2 className="font-display text-sm font-semibold text-white/80 mb-4">Monthly Flow</h2>
          <MonthlyBarChart data={cachedMonthlyValue}/>
          <MonthlyLineChart data={cachedMonthlyValue} />
        </div>
      </div>
    </div>
  </div>
)
}

export default Dashboard