'use client'
import { useState } from 'react'
import Input from "@/components/Input"
import { Transaction } from "@/lib/types" 

type Props = {
  onAdd: (transaction: Transaction) => void
} 

const TransactionForm = ({ onAdd }: Props ) => {

    const [description, setDescription] = useState<string>('')
    const [value, setValue] = useState<number>(0)
    const [type, setType] = useState<"income" | "expense" | undefined>(undefined)
    const [category, setCategory] = useState<string>('')

    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      if (type === undefined ) {return alert('Invalid type')}
      if (value === 0) {return alert('Value must be greater than 0')}
      const newTransaction: Transaction = {
        description,
        value,
        type,
        category
      }
      onAdd(newTransaction)
      setDescription('')
      setValue(0)
      setType(undefined)
      setCategory('')
    }

    return (
    <form className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm p-8"
    onSubmit={handleSubmit}>
      
      <h1 className="text-xl font-semibold text-white mb-6">New Transaction</h1>
      
      <div className="flex flex-col items-center gap-4">
        <Input type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <Input type="number" placeholder="Enter value" value={value} onChange={(e) => setValue(parseInt(e.target.value))}/>
        <Input type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)}/>
      </div>

      <div className="flex gap-2 justify-center mt-6">
        <button
          type="button"
          onClick={() => setType("income")}
          className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors cursor-pointer ${type === "income" ? "bg-green-500 text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}>
          Income
        </button>
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors cursor-pointer ${type === "expense" ? "bg-red-500 text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}>
          Expense
        </button>
      </div>

      <button
        type="submit"
        className="w-full mt-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors cursor-pointer">
        Add Transaction
      </button>

    </form>
  )
}

export default TransactionForm