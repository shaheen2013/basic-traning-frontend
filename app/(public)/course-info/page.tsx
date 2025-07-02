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

  const data = response?.data;

  const loader = isLoading || isFetching;
  return (
    <div className="min-h-screen overflow-x-hidden font-neue-haas-display">
      <Hero isLoading={loader} />
      <UpcomingAvailability isLoading={loader} />
      <WhyChooseUs data={data?.["why_us-items"]} isLoading={loader} />
      <RecommendUs data={data?.feedbacks} isLoading={loader} />
    </div>
  );
}
