import React, { useEffect, useState } from "react";


import { MdDriveFileRenameOutline } from "react-icons/md";
import { updateGroup } from "@/actions/groups/updateGroup";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { deleteGroup } from "@/actions/groups/deleteGroup";
import useGroupStore from "@/stores/useGroupStore";

import { getGroups } from "@/actions/groups/getGroups";
import ListGroup from "../account/ListGroup";
const GroupSettings = () => {
  const {
    groups,
    setGroups,
    selectedGroup,
    setSelectedGroup,
    loadSelectedGroup, 
  } = useGroupStore();

  
  
 


  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");


  const handleUpdateGroup = async () => {

    try {
      if (!selectedGroup?.id) {
        toast({
          variant: "destructive",
          title: "You need to select a group.",

        });
        return;
      }

      const updated = await updateGroup({
        groupId: selectedGroup?.id,
        name: groupName,
        description: groupDescription,
      })
      toast({
        variant: "success",
        title: "The group has been updated",

      });
      
    } catch (error: any) {
      console.error("Failed to update group:", error.message);
    }
  }


  const handleDeleteGroup= async () =>{
    try {
      if(!selectedGroup?.id) {
        toast({
          variant: "destructive",
          title: "You need to select a group.",
        });
        return;
      }

      await deleteGroup({groupId:selectedGroup.id})
  
      
      toast({
        variant: "success",
        title: "Group successfully deleted.",
      });
      
    } catch (error: any) {
      console.error("Failed to delete group:", error.message);

      toast({
        variant:"destructive",
        title: "Failed to delete group.",
      });
      
    }
  }
  
  return <div className="h-full  flex ">
    <div className=" mt-5 w-[26rem] h-full flex items-center justify-center ">
      <ListGroup />
    </div>


    <div className="w-full h-full flex flex-col items-center">
      <div className="mt-5 h-[2rem] flex w-full  justify-center text-xl">
        <span className="mr-3">Group Name:</span> {selectedGroup?.name}
      </div>

      <div className="w-[20rem] h-full flex flex-col items-center justify-center space-y-4">
        {/* Group Name Input */}
        <div className="flex items-center bg-slate-200/5 w-full p-3 rounded-xl">
          <MdDriveFileRenameOutline size={30} className="mr-3" />
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="bg-transparent border-none text-slate-900 focus:outline-none w-full"
            placeholder="Group Name"
          />
        </div>

        {/* Group Description Input */}
        <div className="flex items-center bg-slate-200/5 w-full p-3 rounded-xl">
          <MdDriveFileRenameOutline size={30} className="mr-3" />
          <input
            type="text"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            className="bg-transparent border-none text-slate-900 focus:outline-none w-full"
            placeholder="Group Description"
          />
        </div>

        {/* Update Button */}
        <Button 
          onClick={handleUpdateGroup}
           className={`w-full py-2 rounded-xl text-slate-100 transition bg-blue-600 hover:bg-blue-700`}
         
        >
          Update
        </Button>

        {/* delete  */}
        <div className=" w-full">
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full py-2 rounded-xl text-white transition hover:bg-red-400">Delete Group</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the group and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteGroup} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        </div>


      </div>
    </div>




  </div>;
};

export default GroupSettings;


