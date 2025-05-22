import { ArrowUpRight } from "@/components/icons";
import { Button } from "@/components/ui/button";

const AboutBasicTraning = () => {
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-8 py-36">
      <div className="flex flex-col gap-8">
        <h3 className="text-3xl lg:text-7xl font-semibold text-primary">
          What is{" "}
          <span className="font-normal font-vollkorn italic">
            Basic Training
          </span>
        </h3>
        <p className="text-slate-800 text-3xl font-medium">
          A comprehensive 20-day training program designed to take an
          inexperienced employee from new to a functional member of your team.
        </p>
        <div className="prose max-w-none [&_ul>li]:marker:text-slate-700">
          <ul>
            <li className="text-slate-700 text-3xl font-medium">
              Daily Instructor-Led Sessions
            </li>
            <li className="text-slate-700 text-3xl font-medium">
              Interactive Learning Materials
            </li>
            <li className="text-slate-700 text-3xl font-medium">
              Comprehensive Testing and Topic Certification
            </li>
            <li className="text-slate-700 text-3xl font-medium">
              Expert Guidance and Mentorship
            </li>
            <li className="text-slate-700 text-3xl font-medium">
              Reports and Progress Tracking
            </li>
          </ul>
        </div>
        <Button className="w-full lg:w-fit rounded-full" size="2xl">
          Learn More
          <ArrowUpRight className="ml-3 text-white" />
        </Button>
      </div>
      <div className="border border-red-300 flex items-center justify-center">
        <h3>Calender</h3>
      </div>
    </section>
  );
};

export default AboutBasicTraning;
