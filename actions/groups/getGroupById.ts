

import axios from 'axios';

export const getGroupById = async (id: string) => {
    try {
        const response = await axios.get(`api/groups/single?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("Grup bilgileri alınamadı:", error);
        throw error;
    }
};
