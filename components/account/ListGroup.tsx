"use client"
import React, { useEffect, useState } from 'react';
import {  useGroup } from '@/app/context/GroupContext';
import { Group } from '@/type/types';

const ListGroup = () => {
  const { setSelectedGroup, selectedGroup, isLoading,error,groups } = useGroup();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
 

  if (isLoading) {return <div>Loading...</div>;}

  if (error) {return <div>Error fetching groups: {error.message}</div>; }

  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
  }
  return (
     <div className="w-full h-full flex items-center  scroll-custom  ">
    <ul className="flex flex-col min-w-max  px-4 py-0 mt-2 h-full">
      {groups.map((group: Group) => (
        <li
          key={group.id}
          className="p-5 pt-5 cursor-pointer hover:bg-slate-300/10 text-2xl border rounded-xl whitespace-nowrap mt-2"
          onClick={() => handleSelectGroup(group)}
        >
          {group.name}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default ListGroup;


// useEffect(() => {
//   if (typeof window !== 'undefined') {
//     const fetchGroups = async () => {
//       try {
//         const allGroups = await getGroups();
//         setGroups(allGroups);
//       } catch (error) {
//         console.error("Error fetching groups:", error);
//       }
//     };
//     fetchGroups();
//   }
// }, []);