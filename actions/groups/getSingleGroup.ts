

import axios from 'axios';

const Url = `http://localhost:3000/api/groups/single`; 

interface Group {
  id: string;
  name: string;
  inviteCode: string; 
 
}

export const getSingleGroup = async (groupId: string): Promise<Group | null> => {
  try {
    const response = await axios.get(`${Url}?id=${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
