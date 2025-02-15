
"use client";


import { Button } from "@/components/ui/button";
import { useTask } from '@/context/TaskContext';
import FileUpload from "./FileUpload"; 
import { useAdmin } from "@/context/AdminContext";

const TaskDetail = () => {
  const { isAdmin, } = useAdmin();
   const {setSelectedTask } = useTask();


  
  const handleBack = () => {
    setSelectedTask(null);

  }

  return (
    <div className='h-full  w-full flex  '>
       <Button variant={"link"} className="flex items-start justify-start   text-3xl h-[4rem]" onClick={() => handleBack()}>
              Back
            </Button>
        <div className="  flex flex-col items-center  justify-center h-[calc(100%-5rem)] w-full ">
         
            {!isAdmin && <FileUpload  />}
        </div>    

      </div>
  );
};

export default TaskDetail;


