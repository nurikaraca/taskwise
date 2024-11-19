"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Group } from "@/app/context/GroupContext";
 import { getGroupById } from "@/actions/groups/getGroupById";
 import {  joinGroup } from "@/actions/groups/joinGroup";
 import {  getGroupByInviteCode } from "@/actions/groups/getGroupByInviteCode";

export default  function JoinClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [group, setGroup] = useState<Group | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inviteCode = pathname.split("/").pop(); 


  useEffect(() => {
    const fetchGroup = async () => {

      if (group?.id) {
        try {
          const data = await getGroupById(group.id);
          setGroup(data);
        } catch (err) {
          setError("An error occurred while retrieving group information.");
          console.error(err);
        }
      }
    };

   fetchGroup();
  }, []);

  useEffect(() => {
    if (!inviteCode) return;
    const fetchGroup = async () => {
      try {
        const groupData = await getGroupByInviteCode(inviteCode);
        setGroup(groupData);
      } catch (err) {
        setError("An error occurred while retrieving group information.");
        console.error(err);
      }
    };

    fetchGroup();
  }, [inviteCode]);

  const handleJoinGroup = async () => {
    try {
      setIsJoining(true);
     
      await joinGroup( group?.id, inviteCode);
      alert("You have successfully joined the group!");
      router.push("/");
    } catch (err) {
      setError("An error occurred while joining the group.");
      console.error(err);
    } finally {
      setIsJoining(false);
    }
  };

  if (!group) {
    return <div className="text-white">Loading group information..</div>;
  }

  return (
    <div className="text-white w-full flex items-center justify-center h-full text-4xl flex-col">
      {error && <p>{error}</p>}
       <h1 className="">Group Name: <span className="text-4xl">{group.name}</span> </h1>  
      {isJoining ? (
        <p>Joining the group...</p>
      ) : (
         <button className="flex bg-[#4B5563] p-2 m-2 rounded-xl hover:scale-105" onClick={handleJoinGroup}>Join Group</button>
      )}
    </div>
  );
}

