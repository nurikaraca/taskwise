

import { useGroup } from '@/app/context/GroupContext'
import React, { useEffect, useState } from 'react'
import CreateGroup from './CreateGroup'
import { FaCopy } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

import { getGroupMembers } from '@/actions/groups/getGroupMembers';
import Members from '@/app/(dashboard)/_components/groups/Members';
import { Member } from '@/type/types';





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
    if (typeof window !== 'undefined') {
      const fetchMembers = async () => {
        if (selectedGroup?.id) {
          setLoading(true);
          try {
            const data = await getGroupMembers(selectedGroup.id);
            setMembers(data);

          } catch (error) {
            console.error("Error fetching members:", error);
          } finally {
            setLoading(false);
          }
        }
      };

      fetchMembers();

    }



  }, [selectedGroup]);
  return (

    <div className="flex flex-col h-[40rem] w-full text-sm xl:text-xl  ">
      <div className="flex flex-col h-full w-full p-2  relative  ">
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
                <div className="w-full mb-1 flex justify-center items-center relative  ">
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
                <Members />
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

  )
}

export default GroupDetail

