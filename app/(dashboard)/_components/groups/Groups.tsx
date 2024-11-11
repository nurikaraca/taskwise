'use client'
import React, { useState } from 'react'
import CreateGroup from './CreateGroup'
import { Button } from '@/components/ui/button'
import { IoAddCircle } from "react-icons/io5";
import ListGroup from './ListGroup';
import Link from 'next/link';

const Groups = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const handleShowCreateGroup = () => {
    setShowCreateGroup(prev => !prev)
  }
  return (
    <div className='flex h-[calc(100vh-4rem)] text-slate-200 text-2xl '>

      <div className="w-[3rem] flex flex-col items-center border-r  h-full">

        <div className="w-full h-1/2 overflow-y-scroll scroll-custom flex  flex-col items-center">
          <ListGroup />


        </div>
        <div className="w-full h-1/2 flex flex-col items-center justify-end py-4 space-y-4 ">
          <IoAddCircle
            className=''
            onClick={handleShowCreateGroup}
          />
        </div>


      </div>



      <div className="flex-1  h-full">
        <h1 className='flex '>Groups</h1>

        <div className="w-[10rem]">
          {
            showCreateGroup && <CreateGroup />
          }

        </div>

      </div>



    </div>
  )
}

export default Groups