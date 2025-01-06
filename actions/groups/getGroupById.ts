import axios from 'axios';
const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";
export const getGroupById = async (id: string) => {
    try {
        const response = await axios.get(`${baseURL}/api/groups/single?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("Grup bilgileri alınamadı:", error);
        throw error;
    }
};
