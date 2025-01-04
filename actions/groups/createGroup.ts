import axios from "axios";

export const createGroup = async ({ name, description }: { name: string; description: string }) => {
  try {
    const response = await axios.post("api/groups/create", {
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
