import axios from 'axios';
const Urls = `api/user/getUser`;
export const getUser = async () => {
    try {
        const response = await axios.get(Urls);
        
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
};


