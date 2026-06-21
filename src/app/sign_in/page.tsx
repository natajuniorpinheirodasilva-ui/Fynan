'use client'
import { useState } from "react"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const router = useRouter()

    async function handleSignIn() {
        
        const emailErr = email.length === 0 ? 'Invalid email address' : ''
        const passwordErr = password.length === 0 ? 'Invalid password' : ''

        setEmailError(emailErr)
        setPasswordError(passwordErr)
        
        if (emailErr !== '' || passwordErr !== '') return
        
        const response = await fetch(
            '/api/sign_in',
            {
                method: 'POST',
                
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({ email, password }),
            }
        )
        const data = await response.json()
        console.log("status:", response.status)
        console.log("ok:", response.ok)
        console.log("data:", data)
        
        if (response.ok) { router.push("/") }
        
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-4 bg-cover'
        style={{
            backgroundImage: 
            `
            linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)),
            url('/backgroundImage.jpg')
            `
        }}

        >

        <h1 className='text-4xl font-bold hover:text-blue-500 cursor-default'> Sign in </h1>

        <Input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}} placeholder='Enter your email' type='text'/>

        <Input value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}} type='password' placeholder='Enter your password' />

        <p> New here? <Link className='drop-shadow-[0_0_10px_#60a5fa] text-blue-300 underline' href={"/sign_up"}> Sign up </Link> </p>

        {emailError &&
        <p className="text-white drop-shadow-[0_0_10px_white]" >
            {emailError}
        </p>}

        {passwordError && 
        <p className="text-white drop-shadow-[0_0_10px_white]">
            {passwordError}
        </p>
        }

        <Button onClick={handleSignIn} > Sign in </Button>
            
        </div>
    )}
