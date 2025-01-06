
import axios from 'axios';

const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";

export const joinGroup = async ( inviteCode: string) => {
    try {
        console.log("bu bilgiler groupId ",)
        console.log("bu bilgiler inviteCode",inviteCode)
        const response = await axios.post(`${baseURL}/api/groups/join`, {
            
          
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
