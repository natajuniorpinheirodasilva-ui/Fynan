'use client'
import { useState } from "react"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from "next/link"

export default function SignUpPage() {

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

        <h1 className='text-4xl font-bold hover:text-blue-500 cursor-default'> Sign up </h1>

        <Input placeholder='Enter your email' type='email'/>

        <Input type='password' placeholder='Enter your password' />
        
        <Input type="password" placeholder="Repeat your password"></Input>

        <p> Already have an account? <Link className='text-blue-300 underline' href={"/sign_in"}> Sign in </Link> </p>


        <Button> Sign up </Button>
            
        </div>
    )}
