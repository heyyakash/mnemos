'use client';
import React, { useState } from 'react'
import { ModeToggle } from '../Toggle'
import { Button } from '../ui/button'
import Login from './Login';
import SignUp from './Signup';
import Image from 'next/image';

const AuthComponent = () => {
    const [mode, setMode] = useState<'Login' | 'Sign Up'>("Sign Up")
    const changeMode = () => {
        if (mode === "Login") {
            setMode("Sign Up")
        } else {
            setMode("Login")
        }
    }
    return (
        <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2">
            <div className="w-full relative h-full flex items-center justify-center">

                <div className="absolute top-5 md:top-5 flex items-center justify-between w-full px-6">
                    <Image src={"/light-logo.png"} width={35} height={35} alt = "logo" />

                    <div className='flex items-center gap-3'>
                        <Button onClick={() => changeMode()} className="text-semibold" variant={"outline"}>{mode}</Button>
                        <ModeToggle />
                    </div>

                </div>

                {mode !== "Login" ? <Login /> : <SignUp />}
            </div>

            <div className="w-full h-full bg-secondary hidden lg:block">

            </div>
        </div>
    )
}

export default AuthComponent