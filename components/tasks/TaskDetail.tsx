
"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTask } from '@/context/TaskContext';
import FileUpload from "./FileUpload"; 
import { useAdmin } from "@/context/AdminContext";

import { toast } from "@/hooks/use-toast";



const TaskDetail = () => {
  const { isAdmin, } = useAdmin();
 
  const { selectedTask, setSelectedTask, setView, view } = useTask();
  const [uploadResult, setUploadResult] = useState<any>(null); 
  const [file, setFile] = useState<File | null>(null); 

  

  const handleView = () => {
    if (view !== "taskDetail") {
      setSelectedTask(null);
    }
    setView('taskList');
  
  };

  return (
    <div className='h-full   '>
        <div className=" mt-10 flex flex-col items-center  justify-center ">
         
            {!isAdmin && <FileUpload  />}
        </div>    

      </div>
  );
};

export default TaskDetail;


