'use client'
import { useState } from 'react'

const TransactionForm = () => {

    const [description, setDescription] = useState <string> ('')
    const [value, setValue] = useState <number> (0)
    const [type, setType] = useState <"income" | "expense" | undefined> (undefined)
    const [category, setCategory] = useState <string> ('')

    return (
    <div>
        <p className='text'></p>
        <input type="text" placeholder='Forneça a descrição'/>
    </div>
  )
}

export default TransactionForm