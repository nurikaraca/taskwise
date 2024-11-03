'use client'

import { Loader2 } from 'lucide-react'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'



const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface AuthLayoutProps {
  children: React.ReactNode
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
   <div className={`${geistMono.variable} antialiased flex flex-col justify-center items-center h-screen `} style={{ fontWeight: 400 }}>
    <h1 className="text-5xl font-bold mb-10 text-textColor" >Welcome to TaskWise</h1>

    {children}
   
   </div>
  )
}

export default AuthLayout