import { Skeleton } from "@/components/ui/skeleton";

export const HowWorksSkeleton = () => {
  return (
    <section className="container flex flex-col gap-8 lg:gap-24 py-12 lg:py-32">
      {/* Header section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
        <Skeleton className="h-12 lg:h-24 w-3/5 rounded-md" />
        <Skeleton className="h-6 lg:h-12 w-full rounded-md" />
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`flex flex-col gap-8 lg:gap-12 py-8 lg:py-16 px-4 ${
              i > 0 ? "border-t border-slate-200" : ""
            }`}
          >
            {/* Step number icon */}
            <Skeleton className="w-9 lg:w-[60px] h-16 lg:h-[104px] rounded-md" />

            {/* Step content */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-8 lg:h-10 w-3/4 rounded-md" />
              <Skeleton className="h-6 lg:h-8 w-full rounded-md" />
            </div>

            {/* Button (only for first two steps) */}
            {i < 2 && <Skeleton className="h-10 w-32 rounded-full" />}
          </div>
        ))}
      </div>
    </section>
  );
};
