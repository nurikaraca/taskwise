import { useAdmin } from "@/context/AdminContext";
import { useTask } from "@/context/TaskContext";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { IoIosListBox, IoIosCreate } from "react-icons/io";



const TaskMenu = () => {
  const {setView,selectedTask,setSelectedTask , view } = useTask();
   const  {isAdmin, isLoading  }  =useAdmin();

useEffect(() => {
 isAdmin
}, [isLoading])



const handleTaskListClick = () => {
  if (view === "taskDetail") {
    setSelectedTask(null);
  }
  setView("taskList"); 
};
  return (
    <div className="flex justify-end items-center space-x-4 p-4  rounded-xl  text-white  h-full  backdrop-blur-sm  w-full ">
      
      
      {/* Task List */}
      <button className="flex   space-x-2 p-2  rounded hover:scale-110 " onClick={() => handleTaskListClick() }>
        <IoIosListBox className="text-green-400 text-lg" />
        <span className="">Task List</span>
      </button>

    

      {/* Create Task */}
      {isLoading || isAdmin && (
        <button className="flex   space-x-2 p-2  rounded  items-center hover:scale-110" onClick={() => setView('createTask')}>
          <IoIosCreate className="text-green-400 text-lg flex items-center " />
          <span className=" " >Create Task</span>

        </button>
      )}
    </div>
  );
};

export default TaskMenu;
