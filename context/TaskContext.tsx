
'use client';

import { Task } from "@/type/types";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";


interface TaskContextType {

  selectedTask: Task | null;
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;

 

  dueDate: Date | null;  
  setDueDate: Dispatch<SetStateAction<Date | null>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null); 
 

  return (
    <TaskContext.Provider
      value={{
        
        selectedTask,
        setSelectedTask,
       
        dueDate,  
        setDueDate, 
        
        
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
