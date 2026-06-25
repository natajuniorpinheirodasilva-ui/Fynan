import LogoutButton from './LogoutButton'

type Props = {
    user: {email: string}
}

const Navbar = ({ user }: Props) => {
  return (
    <nav className="backdrop-blur-md bg-black/30 border-b border-white/10 px-6 py-4 flex justify-between items-center" > 
        <div className='text-4xl' >Fynan</div> 
        <div className="flex gap-4 items-center">
        <span>{user.email}</span>
        <LogoutButton> Logout </LogoutButton>
        </div>
      </nav>
  )
}

export default Navbar