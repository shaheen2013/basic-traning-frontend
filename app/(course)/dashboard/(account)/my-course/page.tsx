import {
  Calendar,
  ChevronRight,
  Clock,
  DocumentArrowDown,
  Eye,
  HourGlass,
  TextDescription,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { progress } from "./constant";
import { DownloadCertificate } from "@/components/partials";
import Link from "next/link";

const MyCourse = () => {
  return (
    <div className="flex flex-col gap-4 lg:gap-6 p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-4 min-h-0 lg:min-h-40">
        <Image
          src="/assets/course/lesson.png"
          alt="lesson"
          width={100}
          height={700}
          className="size-full lg:size-40 object-center object-contain rounded-2xl"
        />
        <div className="flex flex-col gap-4 justify-between w-full min-h-full">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center w-full">
            <div className="flex flex-col gap-4 lg:gap-2">
              <div className="flex gap-2.5 items-center">
                <h3 className="text-primary text-xl font-semibold">
                  Basic Training
                </h3>
                <Badge>In Progress</Badge>
              </div>
              <div className="flex gap-4 items-center flex-wrap">
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
            <div className="flex flex-col lg:flex-row gap-4 items-center w-full lg:w-fit">
              <Button variant="outline" className="w-full lg:w-fit" asChild>
                <Link href="/dashboard/syllabus">
                  <Eye className="size-5 text-primary" /> View Syllabus
                </Link>
              </Button>
              <Button variant="outline" className="w-full lg:w-fit">
                <DocumentArrowDown className="size-5 text-primary" /> Generate
                Report
              </Button>
              {progress === 100 ? (
                <DownloadCertificate />
              ) : (
                <Button variant="secondary" className="w-full lg:w-fit">
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
  );
};
export default MyCourse;
