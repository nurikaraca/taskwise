
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGroup } from "@/app/context/GroupContext";
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
        
        setIsAdmin(admin);
        
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
