import { Task } from "@/type/types";
import axios from "axios";

const Urls = `http://localhost:3000/api/tasks/getAll`;



export const getTasks = async (groupId: string): Promise<Task[]> => {
  try {
    
    const response = await axios.get(Urls, {
      params: { groupId },
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
