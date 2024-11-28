import axios from "axios";

export async function createFile({ taskId,fileUrl,fileId,}: 
    { taskId: string; fileUrl: string; fileId: string;}
) {
  try {
    console.log("createfiles a girdi")
    const response = await axios.post("/api/files/create", {
      taskId,
      fileUrl,
      fileId,
    });
  
    return response.data;

  } catch (error: any) {
    console.error("Error creating file:", error.response?.data || error.message);
    throw error;
  }
}
