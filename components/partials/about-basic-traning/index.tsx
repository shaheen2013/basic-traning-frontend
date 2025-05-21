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
        <ul className="flex flex-col gap-2">
          <li className="text-slate-700 text-3xl font-medium list-disc">
            Daily Instructor-Led Sessions
          </li>
          <li className="text-slate-700 text-3xl font-medium list-disc">
            Interactive Learning Materials
          </li>
          <li className="text-slate-700 text-3xl font-medium list-disc">
            Comprehensive Testing and Topic Certification
          </li>
          <li className="text-slate-700 text-3xl font-medium list-disc">
            Expert Guidance and Mentorship
          </li>
          <li className="text-slate-700 text-3xl font-medium list-disc">
            Reports and Progress Tracking
          </li>
        </ul>
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
