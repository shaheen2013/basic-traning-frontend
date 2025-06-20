/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Calendar,
  ChevronRight,
  HourGlass,
  TextDescription,
} from "@/components/icons";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetCourseSummaryQuery } from "@/features/course/dashboardApi";
import { CourseNotFound, Loader } from "@/components/partials";
import { useGetCourseMutation } from "@/features/course/enrollApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { isEmptyObject } from "@/lib/utils";

const Dashboard = () => {
  const router = useRouter();
  const { data, isLoading, isFetching, isError } = useGetCourseSummaryQuery({});

  const courseSummary = data?.data;
  const [getCourse, { isLoading: isGetCourseLoading }] = useGetCourseMutation();

  const handleEnroll = async () => {
    try {
      await getCourse({
        courseId: courseSummary?.id,
      }).unwrap();

      router.push(
        `/courses/${courseSummary?.id}/topics/${courseSummary?.ongoing_lesson}`
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  if (isLoading || isFetching || isError) {
    return <Loader />;
  }

  if (isEmptyObject(courseSummary)) return <CourseNotFound />;

  return (
    <div className="container my-4 lg:my-6 flex flex-col gap-6 lg:gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-6 lg:gap-6 border border-slate-200 rounded-2xl bg-slate-50 shadow-sm">
        {courseSummary?.cover_image && (
          <Image
            src={courseSummary?.cover_image}
            alt="Course Cover Image"
            width={1000}
            height={700}
            className="w-full h-auto max-h-52 lg:max-h-[524px] object-cover object-center rounded-xl"
          />
        )}

        <div className="py-4 lg:py-6 flex flex-col gap-4 lg:gap-6">
          <div>
            <Badge className="mb-2.5">{courseSummary?.status}</Badge>
            <h3 className="text-primary text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">
              {courseSummary?.title}
            </h3>
            <div className="flex gap-4 mb-3 lg:mb-4 items-center flex-wrap">
              <div className="inline-flex items-center gap-1">
                <Calendar className="size-5 text-blue-600" />
                <span className="text-slate-700 text-sm font-normal">
                  {moment(courseSummary?.start_date).format("MMMM D, YYYY")}
                </span>
              </div>
              <div className="inline-flex items-center gap-1">
                <HourGlass className="size-5 text-blue-600" />
                <span className="text-slate-700 text-sm font-normal">
                  {courseSummary?.duration} days
                </span>
              </div>
            </div>
            {courseSummary?.status !== "not_enrolled" && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-primary text-base font-medium">
                    Progress
                  </span>
                  <span className="text-primary text-base font-medium">
                    {courseSummary?.progress}%
                  </span>
                </div>
                <Progress value={courseSummary?.progress} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <TextDescription className="size-5 text-primary" />
              <h3 className="text-primary text-lg font-semibold">Overview</h3>
            </div>
            <p className="text-slate-700 text-base font-normal">
              {courseSummary?.description}
            </p>
          </div>
        </div>
      </div>

      {courseSummary?.status === "ongoing" && (
        <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 lg:p-6 shadow-sm flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
          <h3 className="text-primary text-2xl lg:text-3xl font-semibold">
            Systems
          </h3>
          <Button variant="secondary" asChild>
            <Link
              href={`/courses/${courseSummary?.id}/topics/${courseSummary?.ongoing_lesson}`}
            >
              Continue Course
              <ChevronRight className="size-5 text-white" />
            </Link>
          </Button>
        </div>
      )}

      {courseSummary?.status === "not_enrolled" && (
        <Button
          variant="secondary"
          className="w-full lg:w-fit self-end"
          asChild
          onClick={handleEnroll}
          disabled={isGetCourseLoading}
        >
          <div>
            Start Course
            <ChevronRight className="size-5 text-white" />
          </div>
        </Button>
      )}
    </div>
  );
};

export default Dashboard;
