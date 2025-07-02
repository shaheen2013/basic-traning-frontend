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
  const {
    data: response,
    isFetching,
    isLoading,
  } = useGetHomePageContentQuery({});

  const data = response?.data;

  const loader = isLoading || isFetching;
  return (
    <>
      <Hero isLoading={loader} />
      <AboutBasicTraning isLoading={loader} />
      <Enroll isShow={true} isLoading={loader} data={data?.feedbacks[0]} />
      <HowWorks isLoading={loader} />
      <UpcomingCourse isLoading={loader} />
      <Enroll isLoading={loader} data={data?.feedbacks[1]} />
      <Faq data={data?.faqs} isLoading={loader} />
      <WhyChooseUs data={data?.["why_us-items"]} isLoading={loader} />
      <OurStory isLoading={loader} />
      <RecommendUs data={data?.feedbacks} isLoading={loader} />
    </>
  );
}
