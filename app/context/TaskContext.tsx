
'use client';

import { createContext, useContext, useState, ReactNode } from "react";

export interface Task {
  id: string;
  title: string;
  description: string; 
}


interface TaskContextType {
  isCreateTaskFormVisible: boolean;
  setIsCreateTaskFormVisible: (visible: boolean) => void;
}

export const TaskContext = createContext<TaskContextType | undefined >(undefined) 

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [isCreateTaskFormVisible, setIsCreateTaskFormVisible] = useState(false);
 

  return (
    <TaskContext.Provider
      value={{
        isCreateTaskFormVisible,
        setIsCreateTaskFormVisible,
    
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};
