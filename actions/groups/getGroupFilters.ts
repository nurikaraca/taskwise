import { UserRole } from "@/type/types";
import axios from "axios";


const Urls = `http://localhost:3000/api/groups/groupFilters`;

//all ı çıkarttıtm 
export const getGroupFilters = async (role: UserRole) => {
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
