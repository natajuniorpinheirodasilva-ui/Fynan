'use client'
import { ReactEventHandler, useState } from "react"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState('')
    const [repeatError, setRepeatError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [apiError, setApiError] = useState('')

    const router = useRouter()

    async function handleSignUp() {
        
        const emailErr = email.length === 0 ? 'Invalid email address' : ''
        const passwordErr = password.length === 0 ?'Invalid password' : ''
        const repeatErr = password != repeatPassword ? 'Passwords do not match' : ''

        setRepeatError(repeatErr)
        setEmailError(emailErr)
        setError(passwordErr)


        if (emailErr != '' || passwordErr != '' || password != repeatPassword) return
        
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
        
        if (response.ok) { router.push("/sign_in") } else {setApiError(data.error)}

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

        <h1 className='text-4xl font-bold hover:text-blue-500 cursor-default'> Sign up </h1>

        <Input value={email} onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)} } placeholder='Enter your email' type='email'/>

        <Input value={password} onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)} } type='password' placeholder='Enter your password' />
        
        <Input value={repeatPassword} onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {setRepeatPassword(e.target.value)} } type="password" placeholder="Repeat your password"></Input>

        <p> Already have an account? <Link className='text-blue-300 underline drop-shadow-[0_0_10px_#60a5fa] ' href={"/sign_in"}> Sign in </Link> </p>

        { repeatError && <p className='text-white drop-shadow-[0_0_10px_white] '> {repeatError} </p> }

        { emailError && <p className='text-white drop-shadow-[0_0_10px_white]' > {emailError} </p> }

        { error && <p className='text-white drop-shadow-[0_0_10px_white] '> {error} </p> }

        { apiError && <p className='text-white drop-shadow-[0_0_10px_white] '> {apiError} </p> }

        <Button onClick={handleSignUp}> Sign up </Button>

        </div>
    )}
