import { Member } from "@/type/types";
import axios from "axios";

const Urls = `api/groups`;

export const getGroupMembers = async (groupId: string) => {
  try {
    const response = await axios.get(`${Urls}/${groupId}/members`);

    // Filter non-admin members
    const nonAdminMembers = response.data.filter(
      (member: Member) => member.role !== "ADMIN"
    );
    return nonAdminMembers;
  } catch (error) {
    console.error("Axios error while fetching group members:", error);
    throw error;
  }
};
