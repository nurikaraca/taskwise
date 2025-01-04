

"use client";

import React, { useEffect, useCallback } from "react";
import { Group } from "@/type/types";
import { Button } from "../ui/button";
import { useAdmin } from "@/context/AdminContext";
import useGroupStore from "@/stores/useGroupStore";
import { useSession } from "next-auth/react";
import { getGroups } from "@/actions/groups/getGroups";
import GroupListSkeleton from "@/components/skeleton/group/GroupListSkeleton ";
import { useRouter } from "next/navigation";

const ListGroup: React.FC = () => {
  const {
    groups,
    setSelectedGroup,
    setGroups,
    isLoading,
    setLoading,
    error,
    setError,
    loadSelectedGroup,
  } = useGroupStore();
  const { setIsAdmin } = useAdmin();
  const session = useSession();
  const currentUserId = session.data?.user?.id;
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const groups = await getGroups();
        setGroups(groups);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
    loadSelectedGroup();
  }, [setLoading, setGroups, setError, loadSelectedGroup]);

  const handleSelectGroup = useCallback(
    async (group: Group) => {
      setSelectedGroup(group);

      if (group?.ownerId === currentUserId) {
        setIsAdmin(true);
        router.push("/admin");
      } else {
        setIsAdmin(false);
        router.push("/dashboard");
      }
    },
    [setSelectedGroup, setIsAdmin, currentUserId, router] 
  );

  if (isLoading) return <GroupListSkeleton />;
  if (error) return <div>Error fetching groups: {error.message}</div>;

  return (
    <div className="w-[30rem] h-[20rem]">
      <div className="scroll-custom flex flex-col items-center justify-start h-full border-double border bg-lightBg dark:bg-darkBg gap-2 rounded-xl scroll-auto w-full">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex flex-col items-center justify-center space-y-4 h-full w-full"
            onClick={() => handleSelectGroup(group)}
          >
            <Button
              variant={"mybutton"}
              className="flex items-center justify-center w-[88%] p-5 first:mt-3 last:mb-3"
            >
              {group.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListGroup;

