
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGroup } from "@/context/GroupContext";
import { groupAdmin } from "@/actions/user/isAdmin";


interface AdminContextProps {
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  const { selectedGroup } = useGroup();
  const session = useSession();
  const currentUserId = session.data?.user?.id;
  const groupId = selectedGroup?.id;

  useEffect(() => {
    if (typeof window !== 'undefined') {
     const checkIfAdmin = async () => {
      if (!currentUserId || !groupId) {
        setIsAdmin(false);
        return;
      }

      try {
        const admin = await groupAdmin(groupId);
        if (!admin || admin.length === 0) {
          console.error("No admin found for the group.");
          return;
        }
       
        if( currentUserId == admin[0].id){
          setIsAdmin(true);
        }
      
        console.log("admin",admin)
        
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };

    checkIfAdmin(); 
    }
  
  }, [currentUserId, groupId]);

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextProps => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
