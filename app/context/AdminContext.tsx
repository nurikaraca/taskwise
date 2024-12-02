
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGroup } from "@/app/context/GroupContext";
import { getGroupMembers } from "@/actions/groups/getGroupMembers";

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
        const members = await getGroupMembers(groupId);
        const currentUser = members.find((member:  any) => member.id === currentUserId);
        setIsAdmin(currentUser?.role === "ADMIN" ? true : false);
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
