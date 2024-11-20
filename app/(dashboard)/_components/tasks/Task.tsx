"use client"
import React, { useEffect, useState } from "react";
import TaskMenu from "./TaskMenu";
import { useGroup } from "@/app/context/GroupContext";
import { useSession } from "next-auth/react";
import { getGroupMembers } from "@/actions/groups/getGroupMembers";
import CreateTask from "./CreateTask";
import { useTask } from "@/app/context/TaskContext";
import ListTasks from "./ListTasks";
import AnimatedText from "@/components/AnimatedText";

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
  const { isCreateTaskFormVisible, setIsCreateTaskFormVisible, isTaskListVisible, setIsTaskListVisible } = useTask();
  const session = useSession();
  const currentUserId = session.data?.user?.id;
  const groupId = selectedGroup?.id;

// if selectedGroup changes, it sets isTaskListVisible to false
  useEffect(() => {
    if (typeof window !== 'undefined'){
      setIsTaskListVisible(false);

    }
  }, [selectedGroup, setIsTaskListVisible]);

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
    <div className="h-full text-white  p-6 flex justify-center flex-col w-full ">
      {/* Menü */}
      <div className="w-full flex h-[3rem] justify-center rounded-2xl">
        {
          selectedGroup && <TaskMenu isAdmin={isAdmin} />
        }
        
      </div>

      <div className="h-[calc(100vh-3rem)] ">
        {/* Görevler */}

       
          {/* task list */}

          {isTaskListVisible && <>
            <div className="flex  mt-5  ">
            {/* <h1 className="text-2xl text-center ">Task List</h1> */}
            <ListTasks />
            </div>
          </>

          }
        

        <div className=" flex h-[calc(100vh-30rem)]">
          {
            isAdmin ?
              <>
                {
                  isCreateTaskFormVisible &&
                      <CreateTask />
                }
              </>
              :
              <>
                {!isTaskListVisible && (
                  <div className="flex items-center justify-center w-full">
                    <AnimatedText />
                  </div>
                )}
              </>

          }


        </div>

      </div>

    </div>
  );
};

export default Task;
