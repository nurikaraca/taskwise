import axios from "axios";
const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";
export const createTask = async ({ title, description, groupId, dueDate }: { title: string; description: string; groupId: string, dueDate: Date }) => {
  try {
    const response = await axios.post(`${baseURL}/api/tasks/create`, 
      {title, description, groupId, dueDate });
    return response.data;
  } catch (error: any) {

    if (error.response) {

      throw new Error(`API error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error("API error: No response received from server.");
    } else {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
};
