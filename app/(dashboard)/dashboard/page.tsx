"use client"

import { useGroup } from "@/app/context/GroupContext";


const DashBoard = () => {
  const  {selectedGroup,inviteLink} = useGroup();

  const id = selectedGroup?.id ?? ''; 
  return (
   <div className="bg-green-600 h-full text-white">
   <h1>Hello World</h1>
   
    {/* <GroupPage groupId={id}/>  */}
    <h2> {
          selectedGroup?.inviteLink
        } </h2>
   </div>
  );
}

export default DashBoard




