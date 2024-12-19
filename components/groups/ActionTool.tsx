"use client"
import React from 'react'
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { useGroup } from '@/context/GroupContext';

const ActionTool = () => {
  const { isCreateGroupFormVisible, setIsCreateGroupFormVisible, selectedGroup, setSelectedGroup } = useGroup();




  const handleClick = () => {
    setIsCreateGroupFormVisible(!isCreateGroupFormVisible);
    setSelectedGroup(null);
  }
  return (

    <div className='flex flex-col '>

      
      


    </div>

  )
}

export default ActionTool

