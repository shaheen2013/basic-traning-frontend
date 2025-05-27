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

export default function Home() {
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
