
import axios from 'axios';

export const joinGroup = async ( groupId: string | undefined, inviteCode: string | undefined) => {
    try {
        const response = await axios.post("http://localhost:3000/api/groups/join/", {
            
            groupId,
            inviteCode,
        });

        if (!response.status.toString().startsWith("2")) {
            throw new Error("Katılma işlemi sırasında bir hata oluştu");
        }

        return response.data;
    } catch (error) {
        console.error("Gruba katılırken bir hata oluştu:", error);
        throw error;
    }
};
