import { Skeleton } from "@/components/ui/skeleton";

export const FaqSkeleton = () => {
  return (
    <section
      id="faq"
      className="container grid grid-cols-1 lg:grid-cols-[45%_55%] gap-y-8 gap-x-12 py-12 lg:py-32"
    >
      {/* Left column - heading */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-12 lg:h-20 w-3/4 rounded-md" />
        <Skeleton className="h-6 lg:h-12 w-full rounded-md" />
      </div>

      {/* Right column - accordion items */}
      <div className="space-y-2">
        {[...Array(8)].map((_, i) => (
          <div key={i}>
            {/* Question */}
            <Skeleton className="h-8 lg:h-12 w-full rounded-md mb-3" />
          </div>
        ))}
      </div>
    </section>
  );
};
