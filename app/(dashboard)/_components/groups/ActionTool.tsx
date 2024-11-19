"use client"
import React from 'react'
import { AiOutlineUsergroupAdd } from "react-icons/ai";


import { useGroup } from '@/app/context/GroupContext';

const ActionTool = () => {
  const { isCreateGroupFormVisible,setIsCreateGroupFormVisible, selectedGroup, setSelectedGroup } = useGroup();




  const handleClick = () => {
    setIsCreateGroupFormVisible(!isCreateGroupFormVisible);
    setSelectedGroup(null);
  }
  return (

    <div className='flex  '>

      <div className="tooltip">
        <AiOutlineUsergroupAdd
          className=" h-[1.5rem] w-[1.5rem] md:h-[2.3rem] md:w-[2.3rem]   lg:h-[2.6rem] lg:w-[2.6rem] xl:h-[2.8rem] xl:w-[2.8rem]" onClick={handleClick} />

        <p className="tooltiptext text-xs md:text-sm  lg:text-xl ">
          Create New Group
        </p>
      </div>

    </div>

  )
}

export default ActionTool

