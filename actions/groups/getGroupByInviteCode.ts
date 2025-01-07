import axios from 'axios';
const baseURL = process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_BASE_URL}`
    : "http://localhost:3000";
export const getGroupByInviteCode = async (inviteCode: string) => {
    try {
        console.log("girdi")
        const response = await axios.get(`${baseURL}/api/groups/getWithInviteCode?inviteCode=${inviteCode}`);
        console.log("çıktı")
        return response.data.group;
    } catch (error) {
        console.error("Group information could not be retrieved:", error);
        throw error;
    }
};
