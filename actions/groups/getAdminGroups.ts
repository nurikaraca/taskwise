import axios from "axios";
const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";
export const getAdminGroups  = async () => {
    try {
        const response = await axios.get(`${baseURL}/api/groups/groupFilters`);
        return response.data; 
    } catch (error) {
        console.error("Axios error :", error);
        throw error;
    }
};
