'use client'
import { useState } from "react"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from "next/link"

export default function LoginPage() {

    const [email, seEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {}

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

        <h1 className='text-4xl font-bold hover:text-blue-500 cursor-default'> Login </h1>

        <Input placeholder='Enter your email' type='email'/>

        <Input type='password' placeholder='Enter your password' />

        <p> New here? <Link className='text-blue-300 underline' href={"/sign_up"}> Sign up </Link> </p>


        <Button> Sign in </Button>
            
        </div>
    )}
