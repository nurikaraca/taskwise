import { getGroupFilters } from "@/actions/groups/getGroupFilters";
import { Group, UserRole } from "@/type/types";


export const fetchUserGroupsWithPendingTasks = async (role: UserRole): Promise<Group[]> => {
  try {
    const groups = await getGroupFilters(role);

    
    const groupsWithPendingTasks = groups.filter((group: Group) =>
      group.tasks.some(task => !task.isCompleted) 
    );

    return groupsWithPendingTasks;
  } catch (error) {
    console.error("Error fetching user groups with pending tasks:", error);
    throw error;
  }
};
