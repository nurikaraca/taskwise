
import Sidebar from "@/components/SideBar/sidebar";
import React from "react";
interface AdminLayoutProps {
   children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
 
   return (
      <div className=" w-full flex h-full  ">
         <div className="h-full  sm:w-[270px]">
         <Sidebar  />
         </div>
     
         <main
            className=" w-full  sm:w-[calc(100vw-270px)]
             h-full bg-lightBg2 dark:bg-darkBg"
               
         >
            {children}
         </main>
      </div>

   );
}
export default AdminLayout;