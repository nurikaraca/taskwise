"use client"
import React from 'react'
import {login} from '@/actions/auth'
import { FcGoogle } from "react-icons/fc";


const LoginGoogle = () => {
  return (
    <div onClick={() => login("google")}
     className='flex  items-center p-2 justify-center space-x-3 cursor-pointer border rounded-md'>
      <FcGoogle  size={24}/>
      <p className='flex items-center justify-center text-slate-100'>Continue with Google</p>
    </div>
  )
}

export default LoginGoogle;

