import axios from "axios"


export const getTaskById= async(taskId: string  | undefined) => {
  if (!taskId) {
    throw new Error("Task ID is required");
  }
    const Urls = `http://localhost:3000/api/tasks/getOneTask?taskId=${taskId}`;
   try {
     const response =  await axios.get(Urls);
     return response.data;
   } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw new Error("Failed to fetch task");
   }
};