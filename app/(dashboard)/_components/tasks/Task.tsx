"use client"
import React, { useEffect, useState } from "react";
import TaskMenu from "./TaskMenu";
import { useGroup } from "@/app/context/GroupContext";
import { useSession } from "next-auth/react";
import { getGroupMembers } from "@/actions/groups/getGroupMembers";
import CreateTask from "./CreateTask";
import { useTask } from "@/app/context/TaskContext";

export interface UserGroup {
  id: string; 
  userId: string; 
  groupId: string; 
  role: "ADMIN" | "USER";
  createdAt: Date; 
  updatedAt: Date; 
}

const Task = () => {

  const [isAdmin, setIsAdmin] = useState(false); 
  const { selectedGroup } = useGroup(); 
  const { isCreateTaskFormVisible, setIsCreateTaskFormVisible } = useTask(); 
  const session = useSession();
  const currentUserId = session.data?.user?.id; 
  const groupId = selectedGroup?.id; 
  const task = "";

  console.log("testuser :> ", currentUserId)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkIfAdmin = async () => {
        if (!currentUserId || !groupId) {
          setIsAdmin(false); 
          return;
        }

        try {
          //If the current user is an admin in the selected group, set isAdmin to true.
          const members: UserGroup[] = await getGroupMembers(groupId);
          const currentUser = members.find((member) => member.id === currentUserId);
          if (currentUser?.role === "ADMIN") {
            setIsAdmin(true);
          }
          else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("An error occurred while checking group members:", error);
        }
      };
      checkIfAdmin();

    }

  }, [currentUserId, groupId, selectedGroup]);

  return (
    <div className="h-full text-white  p-6 flex justify-center flex-col w-full">
      {/* Menü */}
      <div className="w-full flex h-[3rem] justify-center rounded-2xl">
        <TaskMenu isAdmin={isAdmin} />
      </div>
       
       <div className="h-[calc(100vh-3rem)] ">
         {/* Görevler */}
      {task ? (
        <div>
          {/*  */}
          <h1 className="text-2xl text-center">Task List</h1>
        </div>
      ) : (
        <div className="h-full ">
          {
            isAdmin ?
              <>

                {
                  isCreateTaskFormVisible ?
                    <>
                      <CreateTask />
                    </>
                    :
                    <>
                      <h1 className="flex items-center justify-center h-full text-5xl text-gray-500">
                        Create a Task
                      </h1>
                    </>
                }
              </>
              :
              <>

              </>
          }


        </div>
      )}
       </div>
     
    </div>
  );
};

export default Task;
