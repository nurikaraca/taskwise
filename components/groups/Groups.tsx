
"use client"
import React, { useEffect } from 'react'
import CreateGroup from './CreateGroup'
import { useGroup } from "../../context/GroupContext"
import ListGroup from './ListGroup'



const Groups = () => {
  const { isCreateGroupFormVisible, setIsCreateGroupFormVisible, selectedGroup, inviteLink, setSelectedGroup } = useGroup()




  const handleClick = () => {
    setIsCreateGroupFormVisible(!isCreateGroupFormVisible);
    setSelectedGroup(null);
  }


  return (
    <div className='flex flex-col lg:flex-row h-full w-full  text-2xl bg-slate-200 '>

      <div className=" flex-1 flex items-center justify-center   ">
       
        <ListGroup />
      </div>
      
      <div className="flex-1 flex items-center justify-center "onClick={handleClick}>
        <CreateGroup />
      </div>


    </div>

  )
}

export default Groups



{/* <div className="w-full h-1/2 flex justify-center ">
       <ActionTool />
     </div> */}

//   {/* Left side */}
//   <div className="justify-start flex flex-col items-center border-r border-slate-700 xl:h-[40rem] w-[1.5rem] sm:w-[2.2rem] md:w-[2.8rem] lg:w-[3.5rem] xl:w-[4.3rem]  ">

//     {/* List groups */}
//     <div className=" h-1/2    w-full     flex justify-center border-b-2 border-slate-700 mb-1 ">
//        <ListGroup />
//     </div>

//     {/* Tools */}
//     <div className="w-full h-1/2 flex justify-center ">
//       <ActionTool />
//     </div>
//   </div>

//   {/* Group detail  */}
//  <div className="w-full ">
//   <GroupDetail/>

//  </div>