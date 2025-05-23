import {
  AboutBasicTraning,
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
    <div className="min-h-screen overflow-x-hidden font-neue-haas-display">
      <Hero />
      <AboutBasicTraning />
      <HowWorks />
      <UpcomingCourse />
      <Faq />
      <WhyChooseUs />
      <OurStory />
      <RecommendUs />
    </div>
  );
}
