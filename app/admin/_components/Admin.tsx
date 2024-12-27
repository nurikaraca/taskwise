"use client"

import Sidebar from "@/components/SideBar/sidebar"
import useGroupStore from "@/stores/useGroupStore";
import { useEffect } from "react";
import { Button } from "react-day-picker";
import { FaCopy } from "react-icons/fa";

const Admin = () => {
  const {
    selectedGroup,
    loadSelectedGroup, 
  } = useGroupStore();

  
  useEffect(() => {
    loadSelectedGroup();
  }, [loadSelectedGroup]);



  return (
    <div className='h-full w-full  flex '>
        <div className="h-full w-full">
        <h1 className="text-3xl  h-full w-full text-slate-950  flex items-center justify-center">{selectedGroup?.name}</h1>
     
           <Sidebar /> 
        </div>
        
        
    </div>
  )
}

export default Admin