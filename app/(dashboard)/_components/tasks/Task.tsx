"use client"
import React, { useEffect, useState } from "react";
import TaskMenu from "./TaskMenu";
import { Group, useGroup } from "@/app/context/GroupContext";
import { useSession } from "next-auth/react";
import { getGroupMembers } from "@/actions/groups/getGroupMembers";
import CreateTask from "./CreateTask";
import { useTask } from "@/app/context/TaskContext";
import ListTasks from "./ListTasks";
import AnimatedText from "@/components/AnimatedText";
import TaskDetail from "./TaskDetail";
import { useAdmin } from "@/app/context/AdminContext";
import { getGroups } from "@/actions/groups/getGroups";

export interface UserGroup {
  id: string;
  userId: string;
  groupId: string;
  role: "ADMIN" | "USER";
  createdAt: Date;
  updatedAt: Date;
}

const Task = () => {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  
  const { selectedGroup } = useGroup();
 const { view,setView, selectedTask,setSelectedTask } = useTask();
 const  {isAdmin, } = useAdmin();
 
  // When the group changes, it updates the view to createTask
  useEffect(() => {
    if (typeof window !== 'undefined'){
      setView("createTask"); 
    }
  }, [selectedGroup, setView]);

  return (
    <div className="h-[33rem] text-white  p-6 flex justify-center flex-col w-full z-20 ">
      {/* Menü */}
      <div className="w-full flex h-[3rem] justify-center rounded-2xl">
        {selectedGroup && <TaskMenu  />}
      </div>

      <div className="h-[calc(100vh-3rem)]  ">
       {
        selectedGroup ? 
          (
          <>
        
          {view === 'taskDetail' && selectedTask && (<TaskDetail  />)}
          {view === 'taskList' && <ListTasks  />}
          {view === 'createTask' && <CreateTask />} 
         
          </>
        )

          : 
          (<div className="flex justify-center items-center h-full">
            <span>Select a group</span>
          </div>)
          
       }
      </div>
    </div>
  );
};

export default Task;
