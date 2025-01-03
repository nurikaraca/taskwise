"use client"
import React from 'react'
import {login} from '@/actions/auth'
import { FaGithub } from "react-icons/fa";


const LoginGithub = () => {
  return (
    <div onClick={() => login("GitHub")}
    className='flex  items-center p-2 justify-center space-x-20 cursor-pointer border rounded-md'>
    
      <FaGithub  size={24}/>
      <p className='flex items-center justify-center text-xs sm:text-sm md:text-md lg:text-lg  xl:text-xl '>Continue with Github</p>
    </div>
  )
}

export default LoginGithub;