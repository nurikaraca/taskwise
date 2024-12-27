import axios from "axios";

const Url = `http://localhost:3000/api/user/checkIsCompleted`;

export const getMemberTaskStatus = async (memberId: string, taskId: string) => {
  try {
    const response = await axios.get(Url, {
      params: { memberId, taskId },
    });
    return response.data; 
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
