"use client"
import { SignInButton, SignedOut } from '@clerk/clerk-react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center'>
        <Link href="/" className='flex items-center space-x-2'>
            <div className='w-fit bg-[#0160fe]'>
                <Image 
                    src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
                    alt="logo"
                    className='invert'
                    width={50}
                    height={50}
                />
            </div>
            <h1 className='text-xl font-bold'>Dropbox</h1>
        </Link>

        <div className='flex items-center px-5 space-x-2'>
          <UserButton afterSignOutUrl='/'/>
          <SignedOut>
            <SignInButton mode='modal' afterSignInUrl='/dashboard'/>
          </SignedOut>
        </div>
    </div>
  )
}

export default Header