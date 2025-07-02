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
      <Hero isLoading={loader} data={data?.hero} />
      <AboutBasicTraning isLoading={loader} data={data?.about_us} />
      <Enroll isShow={true} isLoading={loader} data={data?.feedbacks[0]} />
      <HowWorks isLoading={loader} data={data?.working_guides} />
      <UpcomingCourse isLoading={loader} />
      <Enroll isLoading={loader} data={data?.feedbacks[1]} />
      <Faq data={data?.faqs} isLoading={loader} />
      <WhyChooseUs data={data?.why_us_items} isLoading={loader} />
      <OurStory isLoading={loader} data={data?.our_story} />
      <RecommendUs data={data?.feedbacks} isLoading={loader} />
    </>
  );
}
