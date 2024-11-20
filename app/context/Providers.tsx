// contexts/Providers.tsx
import React from "react";
import { GroupProvider } from "./GroupContext";
import { TaskProvider } from "./TaskContext";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
 
    <TaskProvider >
        <GroupProvider>{children}</GroupProvider>

    </TaskProvider>
   
  );
};

export default Providers;
