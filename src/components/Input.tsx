import { HtmlContext } from 'next/dist/server/route-modules/pages/vendored/contexts/entrypoints';
import React from 'react'

type Props = {
  type: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Input = ({ type, placeholder, value, onChange }: Props) => {
  return (

    <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="
    border p-2 rounded-lg w-80 h-13 focus:bg-blue-500/8
    focus:transition-colors duration-500 backdrop-blur-md bg-gray/5
    focus:opacity-100 focus:ring-2
    focus:ring-gray-500 focus:border-blue-500 transition-all
    "/>

  )
}

export default Input