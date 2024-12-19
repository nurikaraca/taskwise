import { auth } from '@/auth'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu';
import Account from './account/Account';


const Navbar = async () => {
  const session = await auth();

  return (
    <nav className='  flex items-center  justify-between mx-10 h-full  '>
      <Link className='flex-2 mb-4' href="/">
        <Image
          src="/bg-transparent.png"
          alt="logo"
          width={20}
          height={20}
        />
      </Link>
     
      {/* Mobile menu */}
      <div className="flex md:hidden">
        <MobileMenu />
      </div>

      {/* menu */}
      <div className="hidden md:flex items-center flex-3 gap-x-5">
        {/* {
          session && <Link href="/dashboard">
            Dashboard
          </Link>
        } */}
        {!session?.user ? (
          <Link href="/sign-in">
            <div className=" text-white text-sm px-4 py-2 rounded-sm">
              Login
            </div>
          </Link>
        ) : (
          <div className=''>
            
            <Account />
          </div>
        )}
      </div>

    </nav>
  )
}

export default Navbar