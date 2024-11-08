import { auth } from '@/auth'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import Logout from './auth/Logout';

const Navbar =async  () => {
  const session =  await auth();
  return (
    <nav className='border-b   flex justify-center h-full '>
      <div className="container flex items-center justify-between my-4 mx-auto px-10 text-white font-bold">
        <Link className='' href="/">
          Home
        </Link>


        <div className="flex items-center gap-x-5">
          {!session?.user ? (
            <Link href="/sign-in">
              <div className=" text-white text-sm px-4 py-2 rounded-sm">
                Login
              </div>
            </Link>
          ): (
            <>
            <div className="flex items-center gap-x-2 text-sm">
              {session?.user?.name}
              {session?.user.image &&(
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
      </div>
    </nav>
  )
}

export default Navbar