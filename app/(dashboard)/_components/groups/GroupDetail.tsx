import { useGroup } from '@/app/context/GroupContext'
import React from 'react'
import CreateGroup from './CreateGroup'

const GroupDetail = () => {
    const { isCreateGroupFormVisible,setIsCreateGroupFormVisible, selectedGroup,inviteLink } = useGroup()

  return (
    <div className=''>
        <div className="flex h-full w-full text-sm xl:text-xl   ">
    <div className="flex flex-col h-full w-full p-4  relative">
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
              <div className="w-full mb-4">
                <h2 className='text-xl'>Group Name:</h2>
                <h1 className="text-2xl p-2">
                  {selectedGroup?.name}
                </h1>
              </div>

              {/* Members List */}
              <div className="w-full mt-4  p-4">
                <h2 className="text-lg font-semibold">Members:</h2>
                <ul className=" pl-4 bg-red-800">
                    {/* {selectedGroup.members?.map((member) => (
                    <li key={member.id}>{member.name}</li>
                  ))}   */}
                   
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

