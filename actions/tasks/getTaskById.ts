import axios from "axios"

export const getTaskById= async(taskId: string) => {
  console.log("fetch " , taskId)
    const Urls = `http://localhost:3000/api/tasks/getOneTask?taskId=${taskId}`;
   try {
     const response =  await axios.get(Urls);
     return response.data;
   } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw new Error("Failed to fetch task");
   }
};