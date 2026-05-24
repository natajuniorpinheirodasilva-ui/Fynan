import React from 'react'

type Props = {
    children: React.ReactNode
}

const Button = ({ children }: Props) => {
    return(
    <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer rounded-lg hover:bg-black
    transition-colors duration-500 "> {children} </button>
)}

export default Button