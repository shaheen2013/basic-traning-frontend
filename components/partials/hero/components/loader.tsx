import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => {
  return (
    <div className="w-full min-h-dvh">
      <div className="container flex flex-col gap-12 justify-center py-10 lg:py-20 min-h-[calc(100dvh-120px)]">
        <div className="flex flex-col gap-4 lg:gap-6 max-w-[1098px] w-full">
          {/* Price line skeleton */}
          <Skeleton className="h-8 w-48 lg:w-64 rounded-md" />

          {/* Main heading skeleton */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 lg:h-24 w-full rounded-md" />
            <Skeleton className="h-12 lg:h-24 w-3/4 rounded-md" />
          </div>

          {/* Subheading skeleton */}
          <Skeleton className="h-6 lg:h-12 w-full lg:w-4/5 rounded-md" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-14 w-full lg:w-64 rounded-full" />
      </div>
    </div>
  );
};
