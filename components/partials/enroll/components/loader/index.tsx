import { TestimonialCardSkeleton } from "@/components/partials/testimonial/components/loader";
import { Skeleton } from "@/components/ui/skeleton";

export const EnrollSkeleton = ({ isShow = true }: { isShow?: boolean }) => {
  return (
    <section className="bg-slate-50 py-12 lg:py-32">
      <div className="container flex flex-col gap-8 lg:gap-24">
        {/* Testimonial card skeleton */}
        <TestimonialCardSkeleton />

        {/* Button skeleton (conditionally shown) */}
        {isShow && (
          <div className="lg:ml-56">
            <Skeleton className="h-14 w-full lg:w-48 rounded-full" />
          </div>
        )}
      </div>
    </section>
  );
};
