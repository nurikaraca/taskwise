import { auth } from '@/auth'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import Logout from './auth/Logout';
import Search from './Search';
import MobileMenu from './MobileMenu';

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className='border-b border-[#2B2B2B] mx-10 w-full  flex items-center justify-between h-full text-white '>
      {/* <div className="container  my-4 mx-auto px-10 text-white font-bold"> */}
      <Link className='flex-2 ' href="/">
        <Image
          src="/bg-transparent.png"
          alt="logo"
          width={30}
          height={30}
        />
      </Link>
      {/* Search */}
      <div className="flex-5  hidden md:flex">
        <Search />
      </div>

      {/* Mobile menu */}
      <div className="flex md:hidden">
        <MobileMenu />
      </div>

      {/* menu */}
      <div className="hidden md:flex items-center flex-3 gap-x-5">
        {
          session && <Link href="/dashboard">
            Dashboard
          </Link>
        }
        {!session?.user ? (
          <Link href="/sign-in">
            <div className=" text-white text-sm px-4 py-2 rounded-sm">
              Login
            </div>
          </Link>
        ) : (
          <>
            <div className="flex items-center gap-x-2 text-sm">
              {session?.user?.name}
              {session?.user.image && (
                <Image
                  className='rounded-full'
                  width={30}
                  height={30}
                  alt='User Avatar'
                  src={session?.user?.image || ""}
                />
              )}
            </div>
            <Logout />
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar