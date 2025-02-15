"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {  joinGroup } from "@/actions/groups/joinGroup";
import {  getGroupByInviteCode } from "@/actions/groups/getGroupByInviteCode";
import { Group } from "@/type/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";


export default  function JoinClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [group, setGroup] = useState<Group | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const session = useSession();


  const inviteCode = pathname.split("/").pop(); 

  useEffect(() => {
    if (typeof window !== 'undefined'){

         if (!inviteCode) return;
    const fetchGroup = async () => {
      try {
        const groupData = await getGroupByInviteCode(inviteCode);
        setGroup(groupData);
      } catch (err) {
        toast({
          variant:"destructive",
          title: "An error occurred while retrieving group information",
        });
        console.error(err);
      }
    };

    fetchGroup();
    }}, [inviteCode]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const fetchGroup = async () => {
  //       console.log("gorup laa" , group)
  //       if (group?.id) {
  //         try {
  //           const data = await getGroupById(group.id);
  //          console.log("data" , data)
  //           setGroup(data);
  //         } catch (err) {
  //           toast({
  //             variant:"destructive",
  //             title: "An error occurred while retrieving group information",
  //           });
            
  //           console.error(err);
  //         }
  //       }
  //     };
  
  //    fetchGroup();
  //   }
    
  // }, [group]);

  // const groupId  = group?.id
  //    console.log(groupId)

  const handleJoinGroup = async () => {
    try {
      setIsJoining(true);
      if(!inviteCode) {return;}

      await joinGroup(inviteCode );
      toast({
        variant: "success",
        title: "You have successfully joined the group!",
      });
      router.push("/");
    } catch (error: unknown) {
      
      if (error instanceof Error){
        toast({
        variant:"destructive",
        title: error.message || "An error occurred while joining the group.",
      });
      }
      
     
    } finally {
      setIsJoining(false);
    }
  };

  if (!group) {
    return <div className="text-white">Loading group information..</div>;
  }
  
// Check if the logged-in user's ID matches the group's owner ID.
  if(session.data?.user?.id=== group.ownerId){
    return (
      <div className="text-slate-900 w-full flex items-center justify-center h-full text-4xl flex-col">
       <div className=" w-[39rem]  h-[10rem]  bg-[#F4F2EE] flex justify-center items-center flex-col rounded-xl">
  
         <h1 className="">Group Name: <span className="text-4xl ">{group.name}</span> </h1>  
        <p>You are the owner of this group</p>
       </div>
      </div>
      )
  }



  return (
    <div className="text-slate-900 w-full flex items-center justify-center h-full text-4xl flex-col">
     <div className=" w-[39rem]  h-[10rem]  bg-[#F4F2EE] flex justify-center items-center flex-col rounded-xl">

       <h1 className="">Group Name: <span className="text-4xl ">{group.name}</span> </h1>  
      {isJoining ? (
        <p>Joining the group...</p>
      ) : (
         <Button variant={"mybutton"} onClick={handleJoinGroup}>Join Group</Button>
      )}
     </div>
    </div>
  );
}

