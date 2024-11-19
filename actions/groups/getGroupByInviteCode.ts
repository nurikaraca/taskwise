

import axios from 'axios';

export const getGroupByInviteCode = async (inviteCode: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/groups/getWithInviteCode?inviteCode=${inviteCode}`);
        return response.data.group; 
    } catch (error) {
        console.error("Grup bilgileri alınamadı:", error);
        throw error;
    }
};
