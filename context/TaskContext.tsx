
'use client';

import { Task } from "@/type/types";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";


interface TaskContextType {
  isCreateTaskFormVisible: boolean;
  setIsCreateTaskFormVisible: Dispatch<SetStateAction<boolean>>;

  isTaskListVisible: boolean;
  setIsTaskListVisible: Dispatch<SetStateAction<boolean>>;

  selectedTask: Task | null;
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;

  view: 'taskDetail' | 'taskList' | 'createTask'; 
  setView: Dispatch<SetStateAction<'taskDetail' | 'taskList' | 'createTask'>>;

  dueDate: Date | null;  
  setDueDate: Dispatch<SetStateAction<Date | null>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [isCreateTaskFormVisible, setIsCreateTaskFormVisible] = useState(false);
  const [isTaskListVisible, setIsTaskListVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null); 
  const [view, setView] = useState<'taskDetail' | 'taskList' | 'createTask'>('taskList');
 

  return (
    <TaskContext.Provider
      value={{
        isCreateTaskFormVisible,
        setIsCreateTaskFormVisible,
        isTaskListVisible,
        setIsTaskListVisible,
        selectedTask,
        setSelectedTask,
        view,
        setView,

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
