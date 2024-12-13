import { Member, User } from "@/type/types";
import axios from "axios";


const Urls = `http://localhost:3000/api/groups`;
export const groupAdmin = async (groupId: string):Promise<User[]> => {

 
  try {
    const response = await axios.get(`${Urls}/${groupId}/members`);

   
    const groupManager = response.data.filter(
      (member: Member) => member.role !== "USER"
    );

    return groupManager;
  } catch (error) {
    console.error("Axios error while fetching group members:", error);
    throw error;
  }
};
