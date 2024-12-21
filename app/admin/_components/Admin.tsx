"use client"

import Sidebar from "@/components/SideBar/sidebar"
import useGroupStore from "@/stores/useGroupStore";
import { useEffect } from "react";

const Admin = () => {
  const {
    selectedGroup,
    loadSelectedGroup, // loadSelectedGroup'u store'dan alıyoruz
  } = useGroupStore();

  // Component ilk yüklendiğinde localStorage'dan seçilen grubu yükle
  useEffect(() => {
    loadSelectedGroup();
  }, [loadSelectedGroup]);

  console.log("Selected Group:", selectedGroup);

  return (
    <div className='h-full w-full  flex '>
        <h1 className="text-3xl bg-red-600 text-white ">{selectedGroup?.name} </h1>
        <div className="h-full w-full">
          <Sidebar />
        </div>
        
        
    </div>
  )
}

export default Admin