import Image from "next/image";
import { OurStorySkeleton } from "./components/loader";

const OurStory = () => {
  if (true) return <OurStorySkeleton />;
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 lg:py-32">
      <div className="flex flex-col gap-4 lg:gap-8">
        <h3 className="text-3xl lg:text-7xl font-semibold text-primary">
          Our <span className="font-normal font-vollkorn italic">Story</span>
        </h3>
        <p className="text-slate-800 text-base lg:text-3xl font-medium">
          The idea for{" "}
          <span className="font-vollkorn italic font-bold">Basic Training</span>{" "}
          was born out of a simple need—to provide a structured, effective, and
          interactive training program for both individuals and organizations.
        </p>
        <div className="prose max-w-none [&_ul>li]:marker:text-slate-700">
          <ul>
            <li className="text-slate-700 text-base lg:text-3xl font-medium">
              Simplify learning experiences
            </li>
            <li className="text-slate-700 text-base lg:text-3xl font-medium">
              Empower individuals and organizations
            </li>
            <li className="text-slate-700 text-base lg:text-3xl font-medium">
              Bring innovation into e-learning
            </li>
            <li className="text-slate-700text-base lg:text-3xl font-medium">
              Offer a seamless, user-friendly learning environment that’s easy
              to navigate and accessible for individuals and businesses alike.
            </li>
          </ul>
        </div>
      </div>
      <div className="">
        <Image
          src="/assets/landing-page/our-story.png"
          alt="our-story"
          width={1000}
          height={760}
          className="w-full object-cover object-center"
        />
      </div>
    </section>
  );
};

export default OurStory;
