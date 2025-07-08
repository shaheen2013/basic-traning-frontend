"use client";

import { RecommendUs, WhyChooseUs } from "@/components/partials";
import Hero from "./components/hero";
import UpcomingAvailability from "./components/upcoming-availability";
import { useGetCourseInfoContentQuery } from "@/features/cms/cmsApi";

export default function CourseInfo() {
  const {
    data: response,
    isFetching,
    isLoading,
  } = useGetCourseInfoContentQuery({});

  const loader = isLoading || isFetching;
  const data = response?.data;

  return (
    <div className="min-h-screen overflow-x-hidden font-neue-haas-display">
      <Hero
        isLoading={loader}
        data={data?.hero}
        batches={data?.upcoming_batches}
      />
      <UpcomingAvailability
        isLoading={loader}
        batches={data?.upcoming_batches}
      />
      <WhyChooseUs data={data?.why_us_items} isLoading={loader} />
      <RecommendUs data={data?.feedbacks} isLoading={loader} />
    </div>
  );
}
