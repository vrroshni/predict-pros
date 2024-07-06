"use client"
import { useAuth, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { currentUser } from '@clerk/nextjs/server'

const AuthButtons = () => {
    const { isSignedIn } = useUser()

    return (
        <div className='flex gap-4 mt-6'>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up" }><Button className='px-4 text-white capitalize'>Get Started</Button> </Link>
        </div>
    )
}

export default AuthButtons
