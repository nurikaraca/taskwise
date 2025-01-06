import axios from "axios";
const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";
export const deleteGroup = async ({ groupId }: { groupId: string }) => {

    try {
     
        const response = await axios.delete(`${baseURL}/api/groups/delete`, {
            data: { groupId }, 
        })

        return response.data;
    } catch (error : any) {
        console.error("Error deleting  group:", error.response?.data || error.message);

        throw new Error(
          error.response?.data?.message || "An error occurred while deleting the group."
        );
      }
    };