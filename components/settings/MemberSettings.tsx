import { useGroup } from "@/context/GroupContext";
import React, { useEffect } from "react";
import ListGroup from "../account/ListGroup";
import { getGroupMembers } from "@/actions/groups/getGroupMembers";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteUser } from "@/actions/groups/deleteUser";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

const MemberSettings = () => {
  const { selectedGroup, setSelectedGroup, refetchGroups, groups } = useGroup()

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
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting user.",
        description: error.response?.data?.message || error.message || "An unknown error occurred.",
      });
    }
  };




  return (<div className="h-[39rem] text-white flex ">
    <div className=" mt-5 w-[26rem] h-full flex items-center justify-center ">
      <ListGroup />
    </div>


    <div className="w-full h-full flex flex-col items-center ">
      <div className="mt-5 h-[2rem] flex w-full text-white justify-center text-xl">
        <span className="mr-3">Group Name:</span> {selectedGroup?.name}
      </div>

      {/* {selectedGroup && <Members/> }  */}

      <div className="container mx-auto p-4 ">
        <div className="max-h-[33rem] overflow-y-scroll w-full border border-gray-300 rounded-md shadow-md ">
          <table className="table-auto w-full border-collapse ">
            <thead className="bg-black text-white sticky top-0 ">
              <tr>
                <th className="p-4 w-4/6 text-center border-b border-gray-600">User Name</th>
                <th className="p-4 w-2/6 text-center border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {members?.map((member: Member) => (
                <tr key={member.id} className="text-center border-b border-gray-300">
                  <td className="p-4 ">
                    <div className="ml-28 flex gap-2">
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


