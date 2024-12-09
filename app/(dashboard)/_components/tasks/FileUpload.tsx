


import React, { useState } from "react";
import { uploadFile } from "@/actions/files/uploadfile";
import { createFile } from "@/actions/files/createFile";
import { useTask } from "@/app/context/TaskContext";
import { toast } from "@/hooks/use-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Progress } from "@/components/ui/progress";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { selectedTask } = useTask();
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [progress, setProgress] = useState(0); // Progress state

  const handleUpload = async () => {
    if (!file) return;
    if (!selectedTask?.id) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "",
      });
      return;
    }

    try {
      
      const uploadedFile = await uploadFile(file, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        setProgress(percentCompleted);
      });

      const savedFile = await createFile({
        taskId: selectedTask.id,
        fileUrl: uploadedFile.url,
        fileId: uploadedFile.id,
      });

      setUploadResult(savedFile);
      toast({
        title: "Upload Successful!",
      });
    } catch (error) {
      console.error("Upload Failed! ", error);
      toast({
        variant: "destructive",
        title: "Upload Failed!",
        description: "Please try again.",
      });
    }
  };
  
  return (
    <div className="flex justify-center items-center h-full flex-col ">
      <div className="flex flex-col items-center border-[3px] py-12 px-28 border-dashed border-slate-500 space-y-1 ">
        <IoCloudUploadOutline size={300} stroke="#507EC0" className="stroke-custom" />
        <div className="h-[3rem] w-full flex items-center justify-center flex-col space-y-1">
          <input
            id="fileInput"
            className="hidden"
            type="file"
            title=""
            onChange={(e) => {
              const selectedFile = e.target.files ? e.target.files[0] : null;
              setFile(selectedFile);
            }}
          />
          <label
            htmlFor="fileInput"
            className="text-xl bg-[#49A0FC] px-20 p-2 rounded-[5px] hover:bg-[#49a0fcbe] cursor-pointer hover:scale-[1.1] transition-transform duration-300 "
          >
            Choose File
          </label>
          <span className="text-xl flex justify-start">File: {file ? file.name : "No file selected"}</span>
          <button
            onClick={handleUpload}
            className="text-xl bg-[#49A0FC] px-20 p-2 rounded-[5px] hover:bg-[#49a0fcbe] cursor-pointer hover:scale-[1.1] transition-transform duration-300"
          >
            Upload File
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full mt-5 flex justify-center">
        <Progress value={progress} color="green" className="w-[60%]" />
      </div>

      {/* Upload Result */}
      {uploadResult && <p className="mt-3 text-green-600">Upload successful!</p>}
    </div>
  );
};

export default FileUpload;
