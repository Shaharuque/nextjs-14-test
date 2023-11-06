"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import styles from "@/app/ui/css/login.module.css"  //css modules
import clsx from 'clsx';
import {lusitana} from '@/app/ui/fonts'




export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",

    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [clicked, setClicked] = React.useState(false);

    console.log("user", user);


    const onLogin = async () => {
        try {
            setLoading(true);
            setClicked(true)
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center py-[200px] border border-gray-200 shadow-lg shadow-black px-[100px]">
                <h1 className={`${lusitana.className} mb-2`}>{loading ? "Processing" : "Login"}</h1>
                <hr />
                <div className="flex items-center gap-2 mb-6">
                    <label htmlFor="email">email</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="password">password</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                </div>
                <button
                    onClick={onLogin}

                    className={clsx('p-2 border border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600',{'bg-green-200' : clicked  })}>Login here
                </button>
                <Link className={styles.visitSignup} href="/signup">Visit Signup page</Link>
            </div>
        </div>
    )

}