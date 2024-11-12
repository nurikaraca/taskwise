'use client'
import React, { useState } from 'react'
import CreateGroup from './CreateGroup'
import { Button } from '@/components/ui/button'

import ListGroup from './ListGroup';
import Link from 'next/link';
import { useGroup } from "../../../context/GroupContext";
import ActionTool from './ActionTool';




const Groups = () => {
  const { isCreateGroupFormVisible, handleShowCreateGroup } = useGroup();


  return (
    <div className='flex h-[calc(100vh-4rem)] w-full text-slate-200 text-2xl  '>


       {/* Left side */}
      <div className=" justify-start flex flex-col items-center border-r border-slate-700  h-full w-[1.5rem] sm:w-[2.2rem] md:w-[2.8rem] lg:w-[3.5rem] xl:w-[4.3rem]">

         {/* list groups */}
        <div className="w-full h-1/2 overflow-y-scroll scroll-custom flex  justify-center  border-dotted border-b-2 border-slate-700 mb-1">
          <ListGroup />
        </div>

        {/* Tools */}
        <div className="w-full h-1/2 flex justify-center  ">
         <ActionTool />
        </div>

      </div>


   {/* right side */}
      <div className="flex h-full  w-full  flex-col text-sm xl:text-xl ">
        <h1 className="text-center">{isCreateGroupFormVisible ? 'Create New  Group':'Group' }</h1>
        <div className="">
          {
            isCreateGroupFormVisible && <CreateGroup />
          }
        </div>

      </div>



    </div>
  )
}

export default Groups