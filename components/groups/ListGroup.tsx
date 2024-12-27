"use client"

import React, { useEffect } from 'react';
import { Group } from '@/type/types';
import { getGroups } from '@/actions/groups/getGroups';
import { Button } from '../ui/button';
import { useAdmin } from '@/context/AdminContext';
import { redirect } from 'next/navigation'
import GroupListSkeleton from '../skeleton/group/GroupListSkeleton ';
import { useSession } from 'next-auth/react';
import useGroupStore from '@/stores/useGroupStore';


const ListGroup = () => {
  const {
    groups,
    selectedGroup,
    setSelectedGroup,
    setGroups,
    isLoading,
    setLoading,
    error,
    setError,
    loadSelectedGroup,
  } = useGroupStore();

  const { setIsAdmin } = useAdmin();

  const session = useSession();
  const currentUserId = session.data?.user?.id;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchAllGroups = async () => {
        try {
          setLoading(true);
          const groups = await getGroups();
          setGroups(groups);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };
      fetchAllGroups();
      loadSelectedGroup();
    }
  }, []);

  const handleSelectGroup = async (group: Group) => {
      setSelectedGroup(group);
      

    if(group?.ownerId ==currentUserId ){
      setIsAdmin(true)
      redirect("/admin")
    }
    else if(group?.ownerId !== currentUserId) {
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
   

      {groups.map((group: Group)=> (
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
