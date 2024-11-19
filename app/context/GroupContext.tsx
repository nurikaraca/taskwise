
'use client';

import { createContext, useContext, useState, ReactNode } from "react";

export interface Group {
  id: string;
  name: string;
  members: string[]; 
  inviteLink?: string;
  role: string; 
}

interface GroupContextType {
  isCreateGroupFormVisible: boolean;
  setIsCreateGroupFormVisible: (visible: boolean) => void;
  selectedGroup: Group | null;
  setSelectedGroup: (group: Group | null) => void;
  inviteLink: string | null;
  setInviteLink: (link: string | null) => void;
}

export const GroupContext = createContext<GroupContextType | undefined>(undefined);

interface GroupProviderProps {
  children: ReactNode;
}

export const GroupProvider = ({ children }: GroupProviderProps) => {
  const [isCreateGroupFormVisible, setIsCreateGroupFormVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [inviteLink, setInviteLink] = useState<string | null>(null);

  return (
    <GroupContext.Provider
      value={{
        isCreateGroupFormVisible,
        setIsCreateGroupFormVisible,
        selectedGroup,
        setSelectedGroup,
        inviteLink,
        setInviteLink,
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
