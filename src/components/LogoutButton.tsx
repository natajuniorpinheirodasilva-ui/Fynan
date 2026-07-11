'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

type Props = {
    children: React.ReactNode;
}

const LogoutButton = ({ children }: Props) => {

    const router = useRouter()
    async function handleLogout() {
        const response = await fetch(
            '/api/logout',
            {
                method: 'POST',   
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        
        router.push("/sign_in")
        
    }

    return(
    <button className="px-4 py-2 cursor-pointer rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-colors" onClick={ handleLogout }> {children} </button>
    )}

export default LogoutButton