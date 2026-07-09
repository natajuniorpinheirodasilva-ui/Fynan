'use client'
import { useState } from 'react'
import Input from "@/components/Input"
import { Transaction } from "@/lib/types" 

type Props = {
  onAdd: (transaction: Transaction) => void
} 

const TransactionForm = ({ onAdd }: Props ) => {

    const [description, setDescription] = useState<string>('')
    const [descriptionError, setDescriptionError] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [valueError ,setValueError] = useState<boolean>(false)
    const [type, setType] = useState<"income" | "expense" | undefined>(undefined)
    const [typeError, setTypeError] = useState<boolean>(false)
    const [category, setCategory] = useState<string>('')
    const [categoryError, setCategoryError] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date())

    const formatDateForInput = (dateObject: Date): string => {
      return dateObject.toISOString().split(`T`)[0]
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateString = e.target.value
      if(dateString) {
        setDate(new Date(`${dateString}T00:00:00`))
      }
    }
    
    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const numericValue = parseFloat(value) || 0
      
      const hasDescriptionError = description === ""
      const hasValueError = numericValue <= 0
      const hasCategoryError = category === ""
      const hasTypeError = type === undefined

      setDescriptionError(hasDescriptionError)
      setValueError(hasValueError)
      setCategoryError(hasCategoryError)
      setTypeError(hasTypeError)

      if (hasDescriptionError || hasValueError || hasCategoryError|| hasTypeError) {
        return
      }

      const newTransaction: Transaction = {
        description,
        value: numericValue,
        type,
        category,
        date
      }
      onAdd(newTransaction)
      setDescription('')
      setValue('')
      setType(undefined)
      setCategory('')
      setDate(new Date())
    }

    return (
    <form className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm p-8"
    onSubmit={handleSubmit}>
      
      <h1 className="text-xl font-semibold text-white mb-6">New Transaction</h1>
      
      <div className="flex flex-col items-center gap-4">
        <Input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}/>

        <Input
        type="number"
        placeholder="Enter value"
        value={value}
        onChange={(e) => setValue(e.target.value)}/>

        <Input
        type="text"
        placeholder="Enter category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}/>

        <Input
        type='date'
        placeholder='Select date'
        value={formatDateForInput(date)}
        onChange={handleDateChange}/>

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
      
      <div className='mt-5' >
        { descriptionError && <p className='text-white drop-shadow-[0_0_10px_white]' > Invalid Description </p> }
        { valueError && <p className='text-white drop-shadow-[0_0_10px_white]' > Invalid Value </p> }
        { categoryError && <p className='text-white drop-shadow-[0_0_10px_white]' > Invalid Category </p> }
        { typeError && <p className='text-white drop-shadow-[0_0_10px_white]' > Invalid Type </p> }
      </div>
    </form>
  )
}

export default TransactionForm