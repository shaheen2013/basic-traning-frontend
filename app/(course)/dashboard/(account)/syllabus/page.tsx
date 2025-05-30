import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

const Syllabus = () => {
  return (
    <>
      <div className="flex items-center gap-2 font-semibold lg:text-2xl text-lg lg:py-6 lg:px-6 p-4 bg-slate-200 rounded-t-2xl capitalize">
        <Link href="/dashboard/my-course">
          <ChevronLeftIcon className="size-6 lg:size-8 text-primary cursor-pointer" />
        </Link>
        Syllabus
      </div>
      <div className="p-4 lg:p-6">
        Basic Training Syllabus Course Overview Basic Training is a 20-day
        course, structured over four weeks, that provides comprehensive training
        on life, fire, business, health, and auto insurance. It covers product
        knowledge, systems, customer service, and practical applications,
        culminating in a final exam and certification.
      </div>
    </>
  );
};

export default Syllabus;
