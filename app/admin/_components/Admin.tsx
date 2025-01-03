"use client"
import useGroupStore from "@/stores/useGroupStore";
import { useEffect } from "react";
const Admin = () => {
  const {
    selectedGroup,
    loadSelectedGroup, 
  } = useGroupStore();

  
  useEffect(() => {
    loadSelectedGroup();
  }, [loadSelectedGroup]);
 


  return (
    <div className='h-full w-full  flex bg-lightBg2 dark:bg-darkBg text-lightText dark:text-darkText  '>
        <div className="h-full w-full">
        <h1 className="text-3xl  h-full w-full  flex items-center justify-center">{selectedGroup?.name}
        </h1>
     
      
        </div>
        
        
    </div>
  )
}

export default Admin