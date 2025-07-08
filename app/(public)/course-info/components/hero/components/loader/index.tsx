"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => {
  return (
    <div className="w-full min-h-dvh bg-gray-800">
      {/* Hero content skeleton */}
      <div className="container flex items-center py-10 lg:py-20 min-h-[calc(100dvh-120px)]">
        <div className="flex flex-col gap-12 items-start w-full">
          <div className="flex flex-col gap-6 max-w-[1068px] w-full">
            {/* Main heading skeleton */}
            <Skeleton className="h-12 lg:h-24 w-full rounded-md" />
            <Skeleton className="h-12 lg:h-24 w-3/4 rounded-md" />

            {/* Subheading skeleton */}
            <Skeleton className="h-6 lg:h-12 w-full rounded-md" />
            <Skeleton className="h-6 lg:h-12 w-4/5 rounded-md" />
          </div>
          {/* Button skeleton */}
          <Skeleton className="h-14 w-full lg:w-64 rounded-full" />
        </div>
      </div>
    </div>
  );
};
