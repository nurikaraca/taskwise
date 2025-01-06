import axios from "axios";

const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";
export const updateGroup = async ({ groupId, name, description }: { groupId: string, name: string; description: string }) => {

    try {
        const response = await axios.put(`${baseURL}/api/groups/update`, {
            groupId, name, description
        })

        return response.data;
    } catch (error : any) {
        console.error("Error updating group:", error.response?.data || error.message);

        throw new Error(
          error.response?.data?.message || "An error occurred while updating the group."
        );
      }
    };