import axios from "axios";

const Url = `api/groups/delete`
export const deleteGroup = async ({ groupId }: { groupId: string }) => {

    try {
     
        const response = await axios.delete(Url, {
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