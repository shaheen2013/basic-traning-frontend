import { Calendar, HourGlass, TextDescription } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { progress } from "./(account)/my-course/constant";

const Dashboard = () => {
  return (
    <div className="container my-4 lg:my-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-6 lg:gap-6 border border-slate-200 rounded-2xl bg-slate-50 shadow-sm">
        <Image
          src="/assets/dashboard/dashboard.png"
          alt="dashboard"
          width={1000}
          height={700}
          className="w-full h-full object-cover object-center rounded-xl"
        />
        <div className="py-4 lg:py-6 flex flex-col gap-4 lg:gap-6">
          <div>
            <Badge className="mb-2.5">In Progress</Badge>
            <h3 className="text-primary text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">
              Basic Training
            </h3>
            <div className="flex gap-4 mb-3 lg:mb-4 items-center flex-wrap">
              <div className="inline-flex items-center gap-1">
                <Calendar className="size-5 text-blue-600" />
                <span className="text-slate-700 text-sm font-normal">
                  March 18, 2025
                </span>
              </div>
              <div className="inline-flex items-center gap-1">
                <HourGlass className="size-5 text-blue-600" />
                <span className="text-slate-700 text-sm font-normal">
                  20 days
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-primary text-base font-medium">
                  Progress
                </span>
                <span className="text-primary text-base font-medium">
                  {progress}%
                </span>
              </div>
              <Progress value={progress} />
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
              builds foundational knowledge for the upcoming modules. {""}
              This lesson covers [brief summary of what the lesson includes].
              Learners will explore key concepts such as [key topics] and get
              hands-on experience through [activity/project/demo]. This lesson
              builds foundational knowledge for the upcoming modules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
