
"use client"
import React, { useEffect } from 'react'
import CreateGroup from './CreateGroup'
import { Button } from '@/components/ui/button'

import ActionTool from './ActionTool'
import { useGroup } from "../../../context/GroupContext"

import { getGroups } from '@/actions/groups/getGroups'
import GroupDetail from './GroupDetail'
import ListGroup from './ListGroup'


const Groups = () => {
  const { isCreateGroupFormVisible,setIsCreateGroupFormVisible, selectedGroup,inviteLink } = useGroup()



  return (
    <div className='flex h-full w-full text-slate-200 text-2xl '>

  {/* Left side */}
  <div className="justify-start flex flex-col items-center border-r border-slate-700 xl:h-[40rem] w-[1.5rem] sm:w-[2.2rem] md:w-[2.8rem] lg:w-[3.5rem] xl:w-[4.3rem]  ">

    {/* List groups */}
    <div className=" h-1/2    w-full     flex justify-center border-b-2 border-slate-700 mb-1 ">
       <ListGroup />
    </div>

    {/* Tools */}
    <div className="w-full h-1/2 flex justify-center ">
      <ActionTool />
    </div>
  </div>

  {/* Group detail  */}
 <div className="w-full ">
  <GroupDetail/>

 </div>
    
 

 
</div>

  )
}

export default Groups


