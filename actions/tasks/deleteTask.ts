import axios from "axios";
export const deleteTask = async (taskId: string) => {
  try {
    
    
    const response = await axios.delete("http://localhost:3000/api/tasks/delete", {
      params: { taskId }, 
    });
    return response.data; 
  } catch (error: any) {
    console.error("Error deleting task:", error.response?.data || error.message);
    throw error; 
  }
};
