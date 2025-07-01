"use client";

import {
  AboutBasicTraning,
  Enroll,
  Faq,
  Hero,
  HowWorks,
  OurStory,
  RecommendUs,
  UpcomingCourse,
  WhyChooseUs,
} from "@/components/partials";
import { useGetHomePageContentQuery } from "@/features/cms/cmsApi";

export default function Home() {
  const { data, isFetching, isLoading } = useGetHomePageContentQuery({});

  const loader = isLoading || isFetching;
  return (
    <>
      <Hero />
      <AboutBasicTraning />
      <Enroll isShow={true} />
      <HowWorks />
      <UpcomingCourse />
      <Enroll />
      <Faq />
      <WhyChooseUs />
      <OurStory />
      <RecommendUs />
    </>
  );
}
