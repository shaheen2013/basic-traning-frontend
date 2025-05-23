import { RecommendUs, WhyChooseUs } from "@/components/partials";
import Hero from "./components/hero";
import UpcomingAvailability from "./components/upcoming-availability";

export default function CourseInfo() {
  return (
    <div className="min-h-screen overflow-x-hidden font-neue-haas-display">
      <Hero />
      <UpcomingAvailability />
      <WhyChooseUs />
      <RecommendUs />
    </div>
  );
}
