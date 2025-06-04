import {
  ChevronRight,
  Clock,
  HourGlass,
  TextDescription,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const LiveClass = () => {
  return (
    <section className="flex flex-col gap-4 lg:gap-6 px-4 lg:px-6">
      <div className="flex gap-4 items-start">
        <Image
          src={`/assets/course-info/course-cover.png`}
          alt="course-cover"
          width={1000}
          height={700}
          className="max-w-72 w-full h-auto object-cover object-center rounded-xl"
        />
        <div className="flex flex-col gap-5 w-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2.5 items-center">
                <h3 className="text-primary text-xl font-semibold">
                  Live class name is here
                </h3>
                <Badge>Todays</Badge>
              </div>
              <div className="flex gap-4 items-center flex-wrap">
                <div className="inline-flex items-center gap-1">
                  <HourGlass className="size-5 text-blue-600" />
                  <span className="text-slate-700 text-sm font-normal">
                    Left 5:00 Minuets
                  </span>
                </div>
                <div className="inline-flex items-center gap-1">
                  <Clock className="size-5 text-blue-600" />
                  <span className="text-slate-700 text-sm font-normal">
                    April 8, 2025, 09:00PM
                  </span>
                </div>
              </div>
            </div>
            <Button variant="secondary">
              Join Live Class
              <ChevronRight className="size-5" />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-primary text-base font-semibold">
              Instructions
            </h4>
            <ul className="text-slate-700 text-base font-normal">
              <li>Time Limit: 5 minutes </li>
              <li>One Sitting Only – You cannot pause or resume later </li>
              <li>
                All Questions Required – You must attempt every question before
                submitting{" "}
              </li>
              <li>Will allow you to go back and change your answers.</li>
            </ul>
          </div>
        </div>
      </div>
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
    </section>
  );
};

export default LiveClass;
