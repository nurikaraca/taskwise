import { useTask } from "@/app/context/TaskContext";
import React from "react";
import { IoIosListBox, IoIosCreate } from "react-icons/io";

interface TaskMenuProps {
  isAdmin: boolean; 
}

const TaskMenu: React.FC<TaskMenuProps> = ({ isAdmin }) => {
  const { isCreateTaskFormVisible, setIsCreateTaskFormVisible,isTaskListVisible,setIsTaskListVisible } = useTask();
  const  handleChangeTaskFormVisible = ()=>{
    setIsCreateTaskFormVisible(!isCreateTaskFormVisible)
  } 

  const  handleChangeTaskListVisible = ()=>{
    setIsTaskListVisible(!isTaskListVisible)
    
  } 

  return (
    <div className="flex justify-center items-center space-x-4 p-4 border-2 border-green-500 rounded-xl  text-white w-[60%] h-full  ">
      
      
      {/* Task List */}
      <button className="flex   space-x-2 p-2 bg-gray-700 rounded hover:bg-gray-600" onClick={handleChangeTaskListVisible}>
        <IoIosListBox className="text-green-400 text-lg" />
        <span>Task List</span>
      </button>

      {/* Create Task */}
      {isAdmin && (
        <button className="flex   space-x-2 p-2 bg-gray-700 rounded hover:bg-gray-600 items-center" onClick={handleChangeTaskFormVisible}>
          <IoIosCreate className="text-green-400 text-lg flex items-center " />
          <span>Create Task</span>

        </button>
      )}
    </div>
  );
};

export default TaskMenu;
