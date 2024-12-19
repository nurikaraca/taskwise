
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";


interface AdminContextProps {
  isAdmin: boolean;
  setIsAdmin:(value: boolean) => void
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);




 

  return (
    <AdminContext.Provider value={{ isAdmin,setIsAdmin}}>
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
