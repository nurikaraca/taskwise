
import { auth } from '@/auth';
import axios from 'axios';
const Urls = `api/groups/list`;
export const getGroups = async () => {
    try {
       
        const response = await axios.get(Urls);
      
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
};


