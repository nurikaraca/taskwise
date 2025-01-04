import axios from 'axios';
const Urls = `api/user/updateName`;
export const updateName = async ({name} : {name:string}) => {
    try {
        const response = await axios.put(Urls,{name});
        
        return response.data;
    } catch (error: any) {
        console.error("Axios error:", error);
        throw new Error(
            error.response?.data?.message || "An unexpected error occurred."
          );
        }
      };

