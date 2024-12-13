import { getGroupMembers } from "@/actions/groups/getGroupMembers";
import { useGroup } from "@/context/GroupContext";
import { Member } from "@/type/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";


const Members = () => {
  const  {selectedGroup} = useGroup()
 
 
  const {data: members, error, isLoading} =useQuery({
    queryKey: ['groupMembers', selectedGroup?.id],
    queryFn: () =>getGroupMembers(selectedGroup?.id || ""),   
    enabled: !!selectedGroup?.id, // Only run the query if selectedGroup.id is truthy
  })


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching members: {error.message}</div>;
  }

  return (
    <div className="w-full mt-4  p-4 hover:border-b-2 border-slate-200/10  h-[37rem]   scroll-custom ">
     <ul className=" pl-4 w-full ">
      {members.map((member: Member) => (
        <li key={member.id} className="flex items-center justify-start p-3 drop-shadow-2xl  rounded-md cursor-pointer shadow-md hover:scale-105 transition-all duration-200 ease-in-out" >
          
     {member.image ? (
             <Image
             src={member.image}
             alt='avatar'
             width={30}
             height={30}
             className='rounded-full mr-3'
           />
     ) : (
      <RxAvatar size={30} className='rounded-full mr-3'/>
     )}
         
          <span className="text-white font-medium "> {member.name}</span>
          
        </li>
      ))} 
 
  
  

    </ul> 
   
  </div>
  )
}

export default Members