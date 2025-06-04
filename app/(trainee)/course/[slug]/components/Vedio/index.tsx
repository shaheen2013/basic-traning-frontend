import { ChevronLeft, ChevronRight, TextDescription } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Vedio = () => {
  return (
    <section className="bg-slate-50 flex flex-col gap-4 lg:gap-6 pb-4 lg:pb-6">
      <div className="p-4 lg:p-6 bg-slate-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg lg:text-2xl capitalize text-primary">
          My Course
        </h2>

        <div className="flex items-center justify-between gap-2 lg:gap-4">
          <Button
            type="button"
            variant="outline"
            className="bg-transparent shadow-none hover:shadow-sm hover:bg-transparent"
            asChild
          >
            <Link href="/course">
              <ChevronLeft className="size-5" />
              Previous
            </Link>
          </Button>

          <Button type="button" variant="secondary" asChild>
            <Link href="/course">
              Next
              <ChevronRight className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:gap-6 px-4 lg:px-6">
        <Image
          src={`/assets/course-info/course-cover.png`}
          alt="course-cover"
          width={1000}
          height={700}
          className="w-full max-h-[685px] h-full object-cover object-center rounded-xl"
        />
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <TextDescription className="size-5 text-primary" />
            <h3 className="text-primary text-lg font-semibold">Overview</h3>
          </div>
          <p className="text-slate-700 text-base font-normal">
            This lesson covers [brief summary of what the lesson includes].
            Learners will explore key concepts such as [key topics] and get
            hands-on experience through [activity/project/demo]. This lesson
            builds foundational knowledge for the upcoming modules.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Vedio;
