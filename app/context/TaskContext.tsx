
// 'use client';

// import { createContext, useContext, useState, ReactNode } from "react";

// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: string;
//   groupId: string;
//   assignedToId: string;
// }


// interface TaskContextType {

//   isCreateTaskFormVisible: boolean;
//   setIsCreateTaskFormVisible: (visible: boolean) => void;

//   isTaskListVisible: boolean;
//   setIsTaskListVisible: (visible: boolean) => void;

//   selectedTask: Task | null ;
//   setSelectedTask:(task: Task | null) => void;
  
//   view: 'taskList', // Default olarak task list gösteriliyor
//   setView: (view: 'taskDetail' | 'taskList' | 'createTask') => {},
// }

// export const TaskContext = createContext<TaskContextType | undefined >(undefined) 

// interface TaskProviderProps {
//   children: ReactNode;
// }

// export const TaskProvider = ({ children }: TaskProviderProps) => {
//   const [isCreateTaskFormVisible, setIsCreateTaskFormVisible] = useState(false);
//   const [isTaskListVisible, setIsTaskListVisible] = useState(false);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [view, setView] = useState<'taskDetail' | 'taskList' | 'createTask'>('taskList');
//   return (
//     <TaskContext.Provider
//       value={{

//         isCreateTaskFormVisible,
//         setIsCreateTaskFormVisible,
    
//         isTaskListVisible,
//         setIsTaskListVisible,
        
//         selectedTask,
//         setSelectedTask,

//         view,
//         setView,
//       }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTask = () => {
//   const context = useContext(TaskContext);
//   if (!context) {
//     throw new Error("useGroup must be used within a GroupProvider");
//   }
//   return context;
// };


'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  groupId: string;
  assignedToId: string;
  dueDate: Date;
}

interface TaskContextType {
  isCreateTaskFormVisible: boolean;
  setIsCreateTaskFormVisible: Dispatch<SetStateAction<boolean>>;

  isTaskListVisible: boolean;
  setIsTaskListVisible: Dispatch<SetStateAction<boolean>>;

  selectedTask: Task | null;
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;

  view: 'taskDetail' | 'taskList' | 'createTask'; // Default olarak seçenekler
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
