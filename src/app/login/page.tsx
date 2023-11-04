"use client"
import { useState } from "react"

export default function LoginPage() {
    const [email, setEmail] = useState('Shaik@gmail.com')
    return (
        <div>
            <h1>Login{email}</h1>
        </div>
    )
}
