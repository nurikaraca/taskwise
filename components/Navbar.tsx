import { auth } from '@/auth'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import Account from './account/Account';
import { ModeToggle } from './ModeToggle';


const Navbar = async () => {
  const session = await auth();

  return (
    <nav className='relative  flex items-center  justify-between mx-10 h-[5rem]  '>
      <Link className='flex-2 mb-4 z-50' href="/">
        <Image
          src="/bg-transparent.png"
          alt="logo"
          width={20}
          height={20}
        />
      </Link>
     
      

      {/* menu */}
      <div className="flex items-center flex-3 gap-x-5  z-50">
      
        {!session?.user ? (
          <Link href="/sign-in">
            <div className="  text-sm px-4 py-2 rounded-sm dark:text-white">
              Login
            </div>
          </Link>
        ) : (
          <div className=''>
            
            <Account />
          </div>
        )}

             {/* Mode Toggle */}
       <ModeToggle />
      </div>

 
    </nav>
  )
}

export default Navbar