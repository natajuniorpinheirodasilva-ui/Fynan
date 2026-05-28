'use client'
import { ReactEventHandler, useState } from "react"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from "next/link"

export default function SignUpPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState('')    
    const [animateError, setAnimateError] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [animateEmailError, setAnimateEmailError] = useState(false)

    async function handleSignUp() {
        
        if (email.length === 0) {
            
            setEmailError("Invalid email address")

            setAnimateEmailError(true)

            setTimeout(() => {
                setAnimateEmailError(false)
            }, 1000);

        }

        else {setEmailError('')}

        if (password.length === 0 || repeatPassword.length === 0) {}

        if (password != repeatPassword) {

            setError("Passwords are Different.")

            setAnimateError(true)

            setTimeout(() => {
                setAnimateError(false)
            }, 1000)
        
        }
        
        else{
            
            setError("")
            const response = await fetch(
                '/api/sign_up',
                {
                    method: 'POST',
                    
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    
                    body: JSON.stringify({ email, password, repeatPassword }),
                }
            )
            const data = await response.json()
            console.log("status:", response.status)
            console.log("ok:", response.ok)
            console.log("data:", data)
            
    }}

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

        <h1 className='text-4xl font-bold hover:text-blue-500 cursor-default'> Sign up </h1>

        <Input value={email} onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)} } placeholder='Enter your email' type='email'/>

        <Input value={password} onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)} } type='password' placeholder='Enter your password' />
        
        <Input value={repeatPassword} onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {setRepeatPassword(e.target.value)} } type="password" placeholder="Repeat your password"></Input>

        <p> Already have an account? <Link className='text-blue-300 underline drop-shadow-[0_0_10px_#60a5fa] ' href={"/sign_in"}> Sign in </Link> </p>

        {emailError && 
        
        <p className={`
        transition-all duration-300
        ${animateEmailError
        ? "text-blue-400 drop-shadow-[0_0_10px_#60a5fa]"
        : "text-white drop-shadow-[0_0_10px_white] "}
        `} >
            {emailError}
        </p>
        }

        {error && <p className={`
        transition-all duration-300
        ${animateError
        ? "text-blue-400 drop-shadow-[0_0_10px_#60a5fa]"
        : "text-white drop-shadow-[0_0_10px_white] "}
        `} >

            {error}

        </p> }


        <Button onClick={handleSignUp}> Sign up </Button>

        </div>
    )}
