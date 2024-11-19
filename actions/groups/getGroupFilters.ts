import axios from "axios";


const Urls = `http://localhost:3000/api/groups/groupFilters`;


export const getGroupFilters = async (role: "ADMIN" | "USER") => {
    try {
        const response = await axios.get(Urls, {
            params: {
                role, 
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Axios error (getGroupFilters):", error);
        throw error;
    }
};
