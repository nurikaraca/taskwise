import axios from "axios";
const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";
export const createGroup = async ({ name, description }: { name: string; description: string }) => {
  try {
    const response = await axios.post(`${baseURL}/api/groups/create`, {
      name,
      description,
    });

    return response.data; 
  } catch (error: any) {
    
    if (error.response) {
      
      throw new Error(`API error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
    
      throw new Error("No response received from the server.");
    } else {
  
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
};
