"use client"
import React from 'react'
import { AiOutlineUsergroupAdd } from "react-icons/ai";


import { useGroup } from '@/app/context/GroupContext';

const ActionTool = () => {
    const { isCreateGroupFormVisible, handleShowCreateGroup } = useGroup();
    return (
     
    <div className='flex center '>

     <div className="tooltip">
         <AiOutlineUsergroupAdd  
         className=" h-[1.5rem] w-[1.5rem] md:h-[2.3rem] md:w-[2.3rem]   lg:h-[2.6rem] lg:w-[2.6rem] xl:h-[3.1rem] xl:w-[3.1rem]"  onClick={handleShowCreateGroup}/> 
       
          <p className="tooltiptext">
            Create New Group
          </p>
     </div>

    </div>
     
    )
}

export default ActionTool

