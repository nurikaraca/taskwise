// contexts/Providers.tsx
import React from "react";
import { GroupProvider } from "./GroupContext";
import { TaskProvider } from "./TaskContext"; 
import { AdminProvider } from "./AdminContext"; 


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    
      <TaskProvider >
        <GroupProvider>
          <AdminProvider>
          {children}
           </AdminProvider>
          </GroupProvider>

      </TaskProvider>
   
  );
};

export default Providers;
