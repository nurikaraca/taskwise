import axios from "axios";
const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";
export const deleteTask = async (taskId: string) => {
  try {
    
    
    const response = await axios.delete(`${baseURL}/api/tasks/delete`, {
      params: { taskId }, 
    });
    return response.data; 
  } catch (error: any) {
    console.error("Error deleting task:", error.response?.data || error.message);
    throw error; 
  }
};
