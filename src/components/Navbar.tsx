'use client'
import LogoutButton from './LogoutButton'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from "next/navigation"


type Props = {
    user: {email: string}
}

const Navbar = ({ user }: Props) => {
  
  const router = useRouter()

  return (
    <nav className="backdrop-blur-md bg-black/30 border-b border-white/10 px-6 py-4 flex justify-between items-center" > 
        <p className='text-4xl cursor-pointer' onClick={() => {router.push("/")} } >Fynan</p> 
        <div className="flex gap-4 items-center">
        <span> {user.email} </span>
        <button className='bg-blue-950 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-yellow-600
        transition-colors duration-500 hover:text-black' onClick={() => {router.push("/new_transaction")} } > New Transaction </button>
        <LogoutButton> Logout </LogoutButton>
        </div>
      </nav>
  )
}

export default Navbar