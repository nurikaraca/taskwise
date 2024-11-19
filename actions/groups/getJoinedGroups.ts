import axios from 'axios';
const Urls = `http://localhost:3000/api/groups/JoinedGroups`;
export const getJoinedGroups = async () => {
    try {
        const response = await axios.get(Urls);
        
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
};


