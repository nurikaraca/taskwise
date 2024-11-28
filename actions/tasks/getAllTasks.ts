import axios from "axios";

const Urls = `http://localhost:3000/api/tasks/getAll`;

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  groupId: string;
  assignedToId: string;
}

export const getTasks = async (groupId: string): Promise<Task[]> => {
  try {
    
    const response = await axios.get(Urls, {
      params: { groupId },
    });
    console.log("response bu :> ",response.data)
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
