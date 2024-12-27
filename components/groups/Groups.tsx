"use client"
import React from 'react'
import CreateGroup from './CreateGroup'
import ListGroup from './ListGroup'
import useGroupStore from '@/stores/useGroupStore'
import { useSession } from 'next-auth/react'
import Image from 'next/image'



const Groups = () => {
  const session = useSession();
 
  return (
    <div className='flex flex-col lg:flex-row h-full w-full  text-2xl bg-lightBg2 dark:bg-darkBg'>
      {session.data ? <>
        <div className=" flex-1 flex items-center justify-center   ">
          <ListGroup />
        </div>

        <div className="flex-1 flex items-center justify-center ">
          <CreateGroup />
        </div>

      </> :
        <>
           <div className="h-full w-full  flex  items-center justify-center ">
            <Image 
             src="/hero.png"
             alt='Resim açıklaması'
             fill
            />
          </div>
          
        </>}


    </div>

  )
}

export default Groups
