// import axios from 'axios';
// export const getUser = async ({userId}:{userId :string}) => {
//     const Urls = `http://localhost:3000/api/user/${userId}`;
//     try {
//         const response = await axios.get(Urls);
        
//         return response.data;
//     } catch (error) {
//         console.error("Axios error:", error);
//         throw error;
//     }
// };


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
