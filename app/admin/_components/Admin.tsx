"use client"

import Sidebar from "@/components/SideBar/sidebar"
import { useGroup } from "@/context/GroupContext";

const Admin = () => {
const { selectedGroup } = useGroup();

console.log("const Admin = () =>  " , selectedGroup)
  return (
    <div className='h-full w-full  flex '>
        
        <div className="h-full w-full">
          <Sidebar />
        </div>
        
        
    </div>
  )
}

export default Admin