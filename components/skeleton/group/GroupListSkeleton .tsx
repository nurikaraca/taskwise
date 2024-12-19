import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const GroupListSkeleton = () => {
  return (
    <div className="w-[30rem] h-[20rem]">
      <div className="scroll-custom flex flex-col items-center justify-start h-full border-double border bg-slate-50 gap-3 rounded-xl scroll-auto w-[30rem]">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-center space-y-4 h-full w-full bg-slate-500"
          >
            <Skeleton className="h-10 w-full m-2 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupListSkeleton;
