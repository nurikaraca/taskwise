// "use client"
// import React, { useEffect, useState } from 'react';
// import { Group } from '@/type/types';
// import useGroupStore from '@/stores/useGroupStore';
// import { getGroups } from '@/actions/groups/getGroups';
// import { getAdminGroups } from '@/actions/groups/getAdminGroups';

// const ListGroup = () => {
//   const {setSelectedGroup} = useGroupStore();
// const  [groups, setGroups] = useState<Group | null>(null)
// const [loading, setLoading] = useState(true);

  
// useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const fetchAllGroups = async () => {
//         try {
//           const groups = await getAdminGroups();
//           setGroups(groups);
//         } catch (err) {
//          console.log(err)
//         } 
//       };
//       fetchAllGroups();
     
//     }
//   }, []);
  




//    const handleSelectGroup = (group: Group) => {
//      setSelectedGroup(group);
//    }
//   return (
//      <div className="w-full h-full flex items-center  scroll-custom ">
//     <ul className="flex flex-col min-w-max  px-4 py-0 mt-2 h-full">
//       {groups.map((group: Group) => (
//         <li
//           key={group.id}
//           className="p-5 pt-5 cursor-pointer hover:bg-slate-300/10 text-2xl border rounded-xl whitespace-nowrap mt-2"
//           onClick={() => handleSelectGroup(group)}
//         >
//           {group.name}
//         </li>
//       ))}
//     </ul>
//   </div>
//   );
// };

// export default ListGroup;



"use client";

import React, { useEffect, useState } from "react";
import { Group } from "@/type/types";
import useGroupStore from "@/stores/useGroupStore";
import { getAdminGroups } from "@/actions/groups/getAdminGroups";

const ListGroup = () => {
  const { setSelectedGroup } = useGroupStore();
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchAllGroups = async () => {
        try {
          const fetchedGroups = await getAdminGroups();
          setGroups(fetchedGroups);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchAllGroups();
    }
  }, []);

  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xl">
        No Groups Available
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center scroll-custom">
      <ul className="flex flex-col min-w-max px-4 py-0 mt-2 h-full">
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
