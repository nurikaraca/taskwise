

import React from "react";
import GroupProvider  from "./GroupContext";
import { TaskProvider } from "./TaskContext"; 
import { AdminProvider } from "./AdminContext"; 
import { auth } from "@/auth";

const Providers = async ({ children }: { children: React.ReactNode }) => {

  const session = await auth();
  return (
    
      <TaskProvider >
        <GroupProvider >
          <AdminProvider>
          {children}
           </AdminProvider>
          </GroupProvider>

      </TaskProvider>
   
  );
};

export default Providers;
