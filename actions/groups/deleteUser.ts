import axios from "axios";

const Url = `http://localhost:3000/api/groups/deleteUser`
export const deleteUser = async ({ groupId, userId }: { groupId: string,userId: string }) => {

    try {
     
        const response = await axios.delete(Url, {
            data: { groupId, userId },
        });

        return response.data;
    } catch (error : any) {
        console.error("Error deleting  User:", error.response?.data || error.message);

        throw new Error(
          error.response?.data?.message || "An error occurred while deleting the User."
        );
      }
    };