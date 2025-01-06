import { Member } from "@/type/types";
import axios from "axios";

const Urls = `api/groups`;
const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";

export const getGroupMembers = async (groupId: string) => {
  if (!groupId) {
    throw new Error("Group ID is required");
  }
  try {
    const response = await axios.get(`${baseURL}/api/groups/${groupId}`);  
    return response.data;
  } catch (error) {
    console.error("Axios error while fetching group members:", error);
    throw error;
  }
};
