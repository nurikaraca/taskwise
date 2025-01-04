import axios from "axios";

export const getUserById = async ({ userId }: { userId: string }) => {
  const url = `/api/users/${userId}`;
  try {
    const response = await axios.get(url);
    return response.data.user;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
