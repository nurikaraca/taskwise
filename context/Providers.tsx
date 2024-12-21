

import React from "react";
import { TaskProvider } from "./TaskContext"; 
import { AdminProvider } from "./AdminContext"; 
import { auth } from "@/auth";

const Providers = async ({ children }: { children: React.ReactNode }) => {

  const session = await auth();
  return (
    
      <TaskProvider >
          <AdminProvider>
          {children}
           </AdminProvider>
      </TaskProvider>
   
  );
};

export default Providers;
