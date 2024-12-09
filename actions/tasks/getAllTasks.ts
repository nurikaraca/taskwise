import axios from "axios";

const Urls = `http://localhost:3000/api/tasks/getAll`;

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  groupId: string;
  assignedToId: string;
  dueDate: Date;
}

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
