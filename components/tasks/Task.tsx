"use client"
import React, { useEffect, useState } from "react";
import TaskMenu from "./TaskMenu";
import { useGroup } from "@/context/GroupContext";
import { useSession } from "next-auth/react";
import { getGroupMembers } from "@/actions/groups/getGroupMembers";
import CreateTask from "../../../admin/_components/pages/item/CreateTask";
import { useTask } from "@/context/TaskContext";
import ListTasks from "../../../admin/_components/pages/item/ListTasks";
import AnimatedText from "@/components/AnimatedText";
import TaskDetail from "./TaskDetail";
import { useAdmin } from "@/context/AdminContext";
import { getGroups } from "@/actions/groups/getGroups";



const Task = () => {

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  
  const { selectedGroup } = useGroup();
 const { view,setView, selectedTask,setSelectedTask } = useTask();
 const  {isAdmin, } = useAdmin();
 
  // When the group changes, it updates the view to createTask
  useEffect(() => {
    if (typeof window !== 'undefined'){
      setView("taskList"); 
    }
  }, [selectedGroup, setView]);

  return (
    <div className="h-[39rem] text-white  p-6 flex justify-center flex-col w-full z-20  ">
      {isAdmin ? (
        <span>Hello Admin</span>
      )
    : (
    <span> You re Not Admin</span>
    )}
    </div>
  );
};

export default Task;


//  {/* Menü */}
//  <div className="w-full flex h-[3rem] justify-center rounded-2xl ">
//  {selectedGroup && <TaskMenu  />}
// </div>

// <div className="h-[39rem] w-full  ">
// {
//  selectedGroup ? 
//    (
//    <>
 
//    {view === 'taskList' && <ListTasks  />}
//    {view === 'taskDetail' && selectedTask && (<TaskDetail  />)}
//    {view === 'createTask' && <CreateTask />} 
  
//    </>
//  )

//    : 
//    (<div className="flex justify-center items-center h-full">
//      <span>Select a group</span>
//    </div>)
   
// }
// </div>