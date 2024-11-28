import { Group, useGroup } from '@/app/context/GroupContext'
import React, { useEffect, useState } from 'react'
import CreateGroup from './CreateGroup'
import { FaCopy } from "react-icons/fa";
import { getGroupMembers } from '@/actions/groups/getGroupMembers';


 export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}


const GroupDetail = () => {
  const { isCreateGroupFormVisible, setIsCreateGroupFormVisible, selectedGroup, inviteLink } = useGroup()
  const [hoverTextVisible, setHoverTextVisible] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCopyLink = (inviteLink: string) => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      alert("Invite link copied!");
    }
  };



  useEffect(() => {
    const fetchMembers = async () => {
      if (selectedGroup?.id) {
        setLoading(true);
        try {
          const data = await getGroupMembers(selectedGroup.id); // Context'ten gelen ID'yi kullan
          setMembers(data);
        } catch (error) {
          console.error("Error fetching members:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMembers();
  }, [selectedGroup]);

  return (
    <div className=''>
      <div className="flex h-full w-full text-sm xl:text-xl   ">
        <div className="flex flex-col h-full w-full p-2  relative">
          {isCreateGroupFormVisible ? (
            <>
              {/* Create Group Form */}
              <div className='absolute top-10'>
                <CreateGroup />
              </div>
            </>
          ) : (
            <>
              {selectedGroup ? (
                <>
                  {/* Group Name */}
                  <div className="w-full mb-1 flex justify-center items-center relative">
                    <div
                      className="relative flex items-center cursor-pointer"
                      onMouseEnter={() => setHoverTextVisible(true)}
                      onMouseLeave={() => setHoverTextVisible(false)}
                      onClick={() => handleCopyLink(selectedGroup?.inviteLink || '')}
                    >
                      <FaCopy className="text-gray-600 hover:text-blue-600" size={24} />
                      {hoverTextVisible && (
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded">
                          Copy Invite Link
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl ml-2">
                      {selectedGroup?.name}
                    </h1>
                  </div>


                  {/* Members List */}
                  <div className="w-full mt-4  p-4">
                    <h2 className="text-lg font-semibold">Members:</h2>
                    <ul className=" pl-4 w-full bg-slate-500">
                      {members.map((member) => (
                        <li key={member.id} className='w-full bg-slate-500 border border-slate-200'>
                          {member.name}  {/*({member.email})  */}
                        </li>
                      ))}

                    </ul>
                  </div>

                  <p>{inviteLink}</p>
                </>
              ) : (
                <div className="flex items-center justify-center mx-auto ">
                  <h1>Select a Group</h1>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default GroupDetail

