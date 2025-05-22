import {
  AboutBasicTraning,
  Hero,
  HowWorks,
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
      <WhyChooseUs />
    </div>
  );
}
