
'use client';

import { getGroups } from "@/actions/groups/getGroups";
import { Group } from "@/type/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, ReactNode } from "react";




interface GroupContextType {
  isCreateGroupFormVisible: boolean;
  setIsCreateGroupFormVisible: (visible: boolean) => void;
  selectedGroup: Group | null;
  setSelectedGroup: (group: Group | null) => void;
  inviteLink: string | null;
  setInviteLink: (link: string | null) => void;


  groups: Group[];
  isLoading: boolean;
  error: Error | null;
  refetchGroups: () => void;

}

export const GroupContext = createContext<GroupContextType | undefined>(undefined);

interface GroupProviderProps {
  children: ReactNode;
}

export const GroupProvider = ({ children }: GroupProviderProps) => {
  const [isCreateGroupFormVisible, setIsCreateGroupFormVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [inviteLink, setInviteLink] = useState<string | null>(null);

  const { data: groups = [], error, isLoading, refetch } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  return (
    <GroupContext.Provider
      value={{
        isCreateGroupFormVisible,
        setIsCreateGroupFormVisible,
        selectedGroup,
        setSelectedGroup,
        inviteLink,
        setInviteLink,

        groups,
        isLoading,
        error,
        refetchGroups: refetch,
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
