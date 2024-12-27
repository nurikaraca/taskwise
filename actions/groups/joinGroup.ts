
import axios from 'axios';

export const joinGroup = async ( groupId: string | undefined, inviteCode: string | undefined) => {
    try {
        const response = await axios.post("http://localhost:3000/api/groups/join/", {
            
            groupId,
            inviteCode,
        });

         // Check if the response status does not start with "2XX"
         if (!response.status.toString().startsWith("2")) {
            throw new Error("An error occurred while attempting to join");
        }

        return response.data;
    } catch (error : any) {
        if (error.response) {
            const { status, data } = error.response;
            console.error(`Error ${status}: ${data.message}`);
            throw new Error(data.message || "An unexpected error occurred.");
          }

          console.error("An error occurred while joining the group:", error.message);
          throw new Error("An unexpected error occurred.");
    }
};
