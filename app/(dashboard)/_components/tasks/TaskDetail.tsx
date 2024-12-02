
"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTask } from '@/app/context/TaskContext';
import { uploadFile } from "@/actions/files/uploadfile"; 
import FileUpload from "./FileUpload"; 
import { useAdmin } from "@/app/context/AdminContext";
import { createFile } from "@/actions/files/createFile";
import { toast } from "@/hooks/use-toast";



const TaskDetail = () => {
  const { isAdmin, } = useAdmin();
  console.log("detail ,", isAdmin)
  const { selectedTask, setSelectedTask, setView, view } = useTask();
  const [uploadResult, setUploadResult] = useState<any>(null); 
  const [file, setFile] = useState<File | null>(null); 

  

  const handleView = () => {
    setView('taskList');
    if (view !== "taskDetail") {
      setSelectedTask(null);
    }
  };

  console.log("isadmin nne", isAdmin)
  return (
    <div className='h-full'>
      <button
        onClick={() => handleView()}
        className="p-2 bg-gray-700 rounded hover:bg-gray-600 text-white text-3xl"
      >
        Back to Task List
      </button>

    
         
        <div className="h-[calc(100vh-14rem)] flex flex-col items-center  justify-center ">
         
          {!isAdmin && <FileUpload  />}
        </div>

      </div>
  );
};

export default TaskDetail;


