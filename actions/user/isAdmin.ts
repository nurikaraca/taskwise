import { Member } from "@/type/types";
import axios from "axios";

const Urls = `http://localhost:3000/api/groups`;




export const groupAdmin = async (groupId: string) => {
  try {
    const response = await axios.get(`${Urls}/${groupId}/members`);

   
    const groupAdmin = response.data.filter(
      (member: Member) => member.role !== "USER"
    );
    return groupAdmin;
  } catch (error) {
    console.error("Axios error while fetching group members:", error);
    throw error;
  }
};
