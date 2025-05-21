import { Hero } from "@/components/partials";
import AboutBasicTraning from "@/components/partials/about-basic-traning";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden font-neue-haas-display">
      <Hero />
      <AboutBasicTraning />
    </div>
  );
}
