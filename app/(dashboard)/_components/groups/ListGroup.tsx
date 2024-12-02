"use client"

import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Group, useGroup } from '@/app/context/GroupContext';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getGroupFilters } from '@/actions/groups/getGroupFilters';
import { getGroups } from '@/actions/groups/getGroups';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getJoinedGroups } from '@/actions/groups/getJoinedGroups';
const ListGroup = () => {
  const { setSelectedGroup } = useGroup();
  const [groupName, setGroupName]   = useState("");
  const [role, setRole] = useState<"ADMIN" | "USER" | "All">("All");
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

 
  useEffect(() => {

    if (typeof window !== 'undefined'){
   const fetchGroups = async () => {
      try {
        const allGroups = await getGroups();
        setGroups(allGroups);
        setFilteredGroups(allGroups); 
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
    }
  
  }, []);

// Filtreleme işlemi
const handleFilterChange = async (selectedRole: "ADMIN" | "USER" | "All") => {
  setRole(selectedRole);
  if (selectedRole === "All") {
    setFilteredGroups(groups); // Tüm grupları göster
  } else {
    try {
      const filtered = await getGroupFilters(selectedRole);
      setFilteredGroups(filtered);
    } catch (error) {
      console.error("Error filtering groups:", error);
    }
  }
};

  const filters = [
    { label: "All Groups", value: "All" },
    { label: "Only the groups I manage", value: "ADMIN" },
    { label: "Only the groups I joined", value: "USER" },
  ];

  const myonClick =(group: Group) =>{
    setSelectedGroup(group)
    setGroupName(group.name)
  }

  const handleListGroup = async (filterValue: string) => {
    if (filterValue === "All") {
      try {
       
        const adminGroups = await getGroupFilters("ADMIN");
        const userGroups = await getGroupFilters("USER");
        const joinedGroups=  await getJoinedGroups()
         
        const combinedGroups = [...groups, ...adminGroups, ...userGroups].reduce(
          (uniqueGroups, group) => {
            if (!uniqueGroups.some((g: any) => g.id === group.id)) {
              uniqueGroups.push(group);
            }
            return uniqueGroups;
          },
          [] as Group[]
        );
  
        setFilteredGroups(combinedGroups);
      } catch (error) {
        console.error("Error fetching combined groups:", error);
      }
    } else {
      handleFilterChange(filterValue as "ADMIN" | "USER");
    }
  };
  return (
    <div className="flex flex-col items-center space-y-2   w-full scroll-custom  ">
      <Popover >
        <PopoverTrigger asChild>
          <button className="text-white bg-gray-700 p-2 rounded hover:bg-slate-600">
            <GiHamburgerMenu size={24}  />
          </button>
        </PopoverTrigger>
        <PopoverContent className=" bg-gray-800 p-4 rounded-lg shadow-lg text-white ">
          <div className="flex flex-col space-y-4">
           
            <div className="flex flex-col space-y-2 ">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => handleListGroup(filter.value)} 
                  className="text-white bg-gray-700 p-2 rounded-lg hover:bg-gray-600  "

                >
                  {filter.label}
                </button>
              ))}
            </div>


          </div>

        </PopoverContent>
      </Popover>


       {/*List of groups  */}
      
      <TooltipProvider>
         <div className="flex flex-wrap gap-2   justify-center">
           {filteredGroups.map((group: Group) => (
             <Tooltip key={group.id}>
              <TooltipTrigger>
                <div
                   className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white hover:bg-blue-700"
                   onClick={() => myonClick(group)}
                 >
                   {group.name.charAt(0).toUpperCase()}
                 </div>
               </TooltipTrigger>
                <TooltipContent side='right'> 
                 <div className='bg-[#1F1F1F]  text-white'>
                 <p className="  text-xs md:text-sm  lg:text-xl ">
                   {group.name}
               </p>
                 </div>
            
               </TooltipContent> 
            </Tooltip>
          ))}
         </div>
       </TooltipProvider> 

  </div>
  );
};

export default ListGroup;

