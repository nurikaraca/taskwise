
import React, { useEffect } from "react";

import { getGroupMembers } from "@/actions/groups/getGroupMembers";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteUser } from "@/actions/groups/deleteUser";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import useGroupStore from "@/stores/useGroupStore";
import ListGroup from "../account/ListGroup";


export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

const MemberSettings = () => {
  const {
    selectedGroup,
    loadSelectedGroup,
  } = useGroupStore();


  useEffect(() => {
    loadSelectedGroup();
  }, [loadSelectedGroup]);


  const { data: members, error, isLoading } = useQuery({
    queryKey: ['groupMembers', selectedGroup?.id],
    queryFn: () => selectedGroup?.id ? getGroupMembers(selectedGroup.id) : null,
    enabled: !!selectedGroup?.id, // Only run the query if selectedGroup.id is truthy
  })
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching members: {error.message}</div>;
  }



  const handleDelete = async (id: string) => {
    const groupId = selectedGroup?.id;
    const userId = id;

    if (!groupId || !userId) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Group ID or User ID is missing.",
      });
      return;
    }

    try {
      await deleteUser({ groupId, userId });
      toast({
        variant: "success",
        title: "User deleted successfully.",
      });
    } catch (err: unknown) {

     
      if (err instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error deleting user.",
          description: err.message  || "An unknown error occurred.",
        });
      }


      
    }
  };




  return (
  <div className="h-full flex flex-col lg:flex-row bg-lightBg2 dark:bg-darkBg text-lightText dark:text-darkText">
    <div className=" mt-5 w-full lg:w-[26rem] h-[40%] lg:h-full flex items-center justify-center ">
      <ListGroup />
    </div>


    <div className="w-full h-[60%] lg:h-full flex flex-col items-center ">
      <div className="mt-5 h-[2rem] flex w-full  justify-center text-xl">
        <span className="mr-3">Group Name:</span> {selectedGroup?.name}
      </div>

      {/* {selectedGroup && <Members/> }  */}

      <div className="container mx-auto p-4 ">
        <div className="max-h-[33rem] overflow-y-scroll w-full border border-gray-300 rounded-md shadow-md ">
          <table className="table-auto w-full border-collapse ">
            <thead className=" sticky top-0 ">
              <tr>
                <th className="p-4 w-4/6 text-center border-b border-gray-600">User Name</th>
                <th className="p-4 w-2/6 text-center border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {members?.map((member: Member) => (
                <tr key={member.id} className="text-center border-b border-gray-300">
                  <td className="p-4 ">
                    <div className="md:ml-28 flex gap-2">
                      <div className="">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt="avatar"
                            width={40}
                            height={40}
                            className="rounded-full flex items-center"
                          />
                        ) : (
                          <RxAvatar size={40} className="rounded-full text-gray-400" />
                        )}
                      </div>

                      <span className="text-2xl flex items-center ml-2">{member.name}</span>

                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}



            </tbody>
          </table>
        </div>
      </div>
    </div>


  </div>)
};

export default MemberSettings;


