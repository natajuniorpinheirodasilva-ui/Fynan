'use client'
import LogoutButton from './LogoutButton'
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
        <LogoutButton>Logout</LogoutButton>
        </div>
      </nav>
  )
}

export default Navbar