import { useAdmin } from "@/context/AdminContext";
import { useTask } from "@/context/TaskContext";
import React from "react";
import { IoIosListBox, IoIosCreate } from "react-icons/io";



const TaskMenu = () => {
  const {setView } = useTask();
  const  isAdmin  =useAdmin();

 console.log(isAdmin,"aaaaaaaaaaaaaaaa")

  return (
    <div className="flex justify-end items-center space-x-4 p-4  rounded-xl  text-white  h-full  backdrop-blur-sm  w-full ">
      
      
      {/* Task List */}
      <button className="flex   space-x-2 p-2  rounded hover:scale-110 " onClick={() => setView('taskList')}>
        <IoIosListBox className="text-green-400 text-lg" />
        <span className="">Task List</span>
      </button>

      {/* Create Task */}
      {isAdmin && (
        <button className="flex   space-x-2 p-2  rounded  items-center hover:scale-110" onClick={() => setView('createTask')}>
          <IoIosCreate className="text-green-400 text-lg flex items-center " />
          <span className=" " >Create Task</span>

        </button>
      )}
    </div>
  );
};

export default TaskMenu;
