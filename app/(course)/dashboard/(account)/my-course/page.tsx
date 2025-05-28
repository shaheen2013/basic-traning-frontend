import {
  Calendar,
  ChevronRight,
  Clock,
  DocumentArrowDown,
  HourGlass,
  TextDescription,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { progress } from "./constant";
import { DownloadCertificate } from "@/components/partials";

const MyCourse = () => {
  return (
    <div className="bg-slate-50 rounded-2xl flex flex-col">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-slate-200 rounded-t-2xl">
        My Course
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex gap-4 min-h-40">
          <Image
            src="/assets/course/lesson.png"
            alt="lesson"
            width={100}
            height={700}
            className="size-40 object-center object-cover"
          />
          <div className="flex flex-col gap-2 justify-between w-full min-h-full">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2.5 items-center">
                  <h3 className="text-primary text-xl font-semibold">
                    Basic Training
                  </h3>
                  <Badge>In Progress</Badge>
                </div>
                <div className="flex gap-4 items-center">
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
                  <div className="inline-flex items-center gap-1">
                    <Clock className="size-5 text-blue-600" />
                    <span className="text-slate-700 text-sm font-normal">
                      April 8, 2025
                    </span>
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className="flex gap-4 items-center">
                <Button variant="outline">
                  <DocumentArrowDown className="size-5 text-primary" /> Generate
                  Report
                </Button>
                {progress === 100 ? (
                  <DownloadCertificate />
                ) : (
                  <Button variant="secondary">
                    Continue Course
                    <ChevronRight className="size-5 text-white" />
                  </Button>
                )}
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
      </div>
    </div>
  );
};
export default MyCourse;
