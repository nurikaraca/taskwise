"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useGroup } from '@/context/GroupContext';
import { Group } from '@/type/types';
import { getGroups } from '@/actions/groups/getGroups';
import { Button } from '../ui/button';
import { useAdmin } from '@/context/AdminContext';
import { redirect } from 'next/navigation'
import GroupListSkeleton from '../skeleton/group/GroupListSkeleton ';
import { useSession } from 'next-auth/react';


const ListGroup = () => {
  const { setSelectedGroup, selectedGroup, isLoading, error, groups } = useGroup();
  const { setIsAdmin } = useAdmin();

  const session = useSession();
  const currentUserId = session.data?.user?.id;
  const [allGroups, setAllGroups] = useState<Group[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchAllGroups = async () => {
        try {
          const groups = await getGroups()
          setAllGroups(groups);
        
        } catch (error) {
          console.error("Error fetching all groups:", error);
        }
      };
      fetchAllGroups();
    }
  }, []);

  const handleSelectGroup = async (group: Group) => {
      setSelectedGroup(group);
     
       if(!selectedGroup ){
        return      
       }

 

    if(selectedGroup?.ownerId ==currentUserId ){
      setIsAdmin(true)
      redirect("/admin")
    }
    else if(selectedGroup?.ownerId != currentUserId) {
      setIsAdmin(false)
      redirect("/dashboard")
    }
    else {
      redirect("/")
    }
  };

  if (isLoading) return <GroupListSkeleton />;
  if (error) return <div>Error fetching groups: {error.message}</div>;
  return (
    <div className="w-[30rem] h-[20rem]">

    
    <div className="scroll-custom  flex flex-col items-center justify-start h-full  border-double border bg-slate-50 gap-3 rounded-xl scroll-auto w-[30rem]  ">
   

      {allGroups.map((group: Group)=> (
          <div
          key={group.id}
           className=" flex flex-col items-start justify-center space-y-4 h-full w-full  "
            onClick={() => handleSelectGroup(group)}
         >
           <Button variant={'mybutton'} className='flex items-center justify-center  w-full m-2 p-2 '>{group.name} </Button>
         </div>
      ))}
       
    </div>

    </div>
  );
};

export default ListGroup;
