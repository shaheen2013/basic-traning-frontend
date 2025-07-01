import { Skeleton } from "@/components/ui/skeleton";

export const WhyChooseUsSkeleton = () => {
  return (
    <div className="bg-slate-50">
      <div className="container py-12 lg:py-32 flex flex-col gap-8 lg:gap-24">
        {/* Header section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Main heading */}
          <Skeleton className="h-12 lg:h-24 w-48 lg:w-80 rounded-md mx-auto lg:mx-0" />

          {/* Rating section */}
          <div className="flex flex-col gap-1.5 lg:gap-3 w-full lg:w-auto">
            <Skeleton className="h-6 lg:h-12 w-48 lg:w-64 rounded-md" />
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="size-4 lg:size-8 rounded-full mr-1 lg:mr-2"
                />
              ))}
              <Skeleton className="h-6 lg:h-10 w-12 lg:w-20 ml-3 rounded-md" />
            </div>
          </div>
        </div>

        {/* Reasons grid */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-0.5 rounded-sm">
              <div className="flex flex-col gap-5 lg:gap-10 p-5 lg:p-10 bg-white h-full">
                {/* Icon placeholder */}
                <Skeleton className="size-12 lg:size-16 rounded-md" />

                {/* Content */}
                <div className="flex flex-col gap-4">
                  <Skeleton className="h-8 lg:h-10 w-3/4 rounded-md" />
                  <Skeleton className="h-6 lg:h-8 w-full rounded-md" />
                  <Skeleton className="h-6 lg:h-8 w-5/6 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
