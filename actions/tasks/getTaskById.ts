import axios from "axios"
const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";
export const getTaskById= async(taskId: string  | undefined) => {
  if (!taskId) {
    throw new Error("Task ID is required");
  }
    const Urls = `${baseURL}/api/tasks/getOneTask?taskId=${taskId}`;
   try {
     const response =  await axios.get(Urls);
     return response.data;
   } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw new Error("Failed to fetch task");
   }
};