import axios from "axios";

const Url = `api/groups/update`
export const updateGroup = async ({ groupId, name, description }: { groupId: string, name: string; description: string }) => {

    try {
        const response = await axios.put(Url, {
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