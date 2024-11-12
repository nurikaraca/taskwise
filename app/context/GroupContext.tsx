'use client'
import { createContext, useContext, useState, ReactNode } from "react";

interface GroupContextType {
  isCreateGroupFormVisible: boolean;
  handleShowCreateGroup: () => void;
}

export const GroupContext = createContext<GroupContextType | undefined>(undefined);

interface GroupProviderProps {
  children: ReactNode;
}

export const GroupProvider = ({ children }: GroupProviderProps) => {
  const [isCreateGroupFormVisible, setIsCreateGroupFormVisible] = useState(false);

  const handleShowCreateGroup = () => setIsCreateGroupFormVisible((prev) => !prev);

  return (
    <GroupContext.Provider
      value={{
        isCreateGroupFormVisible,
        handleShowCreateGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};


export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};
