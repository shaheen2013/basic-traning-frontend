import { Skeleton } from "@/components/ui/skeleton";

export const UpcomingCourseSkeleton = () => {
  return (
    <div className="container p-6 lg:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-8 bg-blue-100 my-12 lg:my-36">
      {/* Heading skeleton */}
      <Skeleton className="h-12 lg:h-20 w-64 lg:w-96 rounded-md mx-auto lg:mx-0" />

      {/* Button skeleton */}
      <Skeleton className="h-12 w-36 lg:w-44 rounded-full mx-auto lg:mx-0" />
    </div>
  );
};
