import { getGroupFilters } from "@/actions/groups/getGroupFilters";
import {  useGroup } from "@/app/context/GroupContext";
import { Group } from "@/type/types";
import { useEffect, useState } from "react";


const ListPeddingTasks = () => {
    const [listOfGroups, setListOfGroups] = useState<Group[]>([]);
    //const [role, setRole] = useState<"ADMIN" | "USER" | "All">("All");

   
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
  
        const fetchAllGroups = async () => {
          try {      
            const response = await getGroupFilters("USER"); 
            setListOfGroups(response) 
         
          } catch (error) {
            console.error("Error fetching all groups:", error);
          }
        };
  
        fetchAllGroups();
      }
  
    }, []);
  
   
  return (
    <div>ListPeddingTasks</div>
  )
}

export default ListPeddingTasks