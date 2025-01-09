import React, { useState } from "react";
import { useTask } from "@/context/TaskContext";
import { toast } from "@/hooks/use-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Progress } from "@/components/ui/progress";
import { uploadAndCreateFile } from "@/actions/files/uploadAndCreateFile";
import { UploadResult } from "@/type/types";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { selectedTask } = useTask();
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [progress, setProgress] = useState(0);

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
      console.log("file ", file)
      console.log("selected", selectedTask);

      const result = await uploadAndCreateFile(file, selectedTask.id, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        setProgress(percentCompleted);
      });

console.log("result" ,result)
      setUploadResult(result);

      toast({
        title: "Upload and Record Creation Successful!",
      });
    } catch (error) {
      console.error("Upload Failed! ", error);
      toast({
        variant: "destructive",
        title: "Upload Failed!",
        description: `Please try again. ${error}`,
      });
    }
  };



  return (
    <div className="flex justify-center items-center h-full flex-col p-3 m-3 " >

      <div className="flex flex-col items-center border-[3px] border-dashed border-slate-500 p-[5rem] gap-5 ">
        <IoCloudUploadOutline size={300} stroke="#507EC0" className="stroke-custom" />
        <div className="h-[3rem] w-full flex items-center justify-center flex-col space-y-1">
          <input
            id="fileInput"
            className="hidden"
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const selectedFile = e.target.files ? e.target.files[0] : null;
              if (selectedFile && selectedFile.type === "application/pdf") {
                setFile(selectedFile);
              } else {
                setFile(null);
                toast({
                  variant: "destructive",
                  title: "Invalid File Type",
                  description: "Please select a valid PDF file.",
                });
              }
            }}
          />
          <label
            htmlFor="fileInput"
            className="text-xl bg-[#49A0FC] px-20 p-2 rounded-[5px] hover:bg-[#49a0fcbe] cursor-pointer hover:scale-[1.1] transition-transform duration-300 "
          >
            Choose PDF
          </label>
          <span className="text-xl flex justify-start"> {file && file.name}</span>
          <button
            onClick={handleUpload}
            className="text-xl bg-[#49A0FC] px-20 p-2 rounded-[5px] hover:bg-[#49a0fcbe] cursor-pointer hover:scale-[1.1] transition-transform duration-300"
          >
            Upload PDF
          </button>


          {/* Progress Bar */}
          <div className="w-full  flex justify-center">
            <Progress value={progress} color="green" className="w-[60%]" />
          </div>

          {/* Upload Result */}
          {uploadResult && <p className="mt-3 text-green-600">Upload successful!</p>}
        </div>
      </div>

    </div>
  );
};

export default FileUpload;
