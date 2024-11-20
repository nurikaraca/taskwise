import axios from "axios";

const Urls = `http://localhost:3000/api/groups`;



export const getGroupMembers = async (groupId: string) => {
  try {
    const response = await axios.get(`${Urls}/${groupId}/members`);
    return response.data;
  } catch (error) {
    console.error("Axios error while fetching group members:", error);
    throw error;
  }
};
