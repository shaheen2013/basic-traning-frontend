/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Calendar,
  ChevronRight,
  DocumentArrowDown,
  Eye,
  HourGlass,
  TextDescription,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import {
  CourseNotFound,
  DownloadCertificate,
  Loader,
} from "@/components/partials";
import Link from "next/link";
import { courseMenus } from "@/components/partials/header/constans";
import { usePathname, useRouter } from "next/navigation";
import { useGetCourseSummaryQuery } from "@/features/course/dashboardApi";
import { useGetCourseMutation } from "@/features/course/enrollApi";
import { isEmptyObject } from "@/lib/utils";
import moment from "moment";
import { toast } from "sonner";

const MyCourse = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading, isFetching } = useGetCourseSummaryQuery({});

  const courseSummary = data?.data;
  const [getCourse, { isLoading: isGetCourseLoading }] = useGetCourseMutation();

  const handleEnroll = async () => {
    try {
      const { data } = await getCourse({
        courseId: courseSummary?.id,
      }).unwrap();

      const nextActivity = data?.ongoing_quiz
        ? "quiz"
        : data?.ongoing_assignment
        ? "assignment"
        : data?.ongoing_lesson;

      router.push(
        `/courses/${courseSummary?.id}/days/${data?.ongoing_day}/topics/${nextActivity}`
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  if (isLoading || isFetching) return <Loader />;

  if (!isLoading && !isFetching && isEmptyObject(courseSummary))
    return <CourseNotFound />;
  return (
    <>
      <div className="hidden lg:block font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-slate-200 rounded-t-2xl capitalize">
        {courseMenus.find((menu) => menu.href === pathname)?.label}
      </div>
      <div className="flex flex-col gap-4 lg:gap-6 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {courseSummary?.cover_image && (
            <Image
              src={courseSummary?.cover_image.trim()}
              alt="Course Cover Image"
              width={1000}
              height={700}
              className="w-full max-w-40 h-auto object-cover object-center rounded-xl"
            />
          )}
          <div className="flex flex-col gap-4 justify-between w-full min-h-full">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center w-full">
              <div className="flex flex-col gap-4 lg:gap-2">
                <div className="flex gap-2.5 items-center">
                  <h3 className="text-primary text-xl font-semibold">
                    {courseSummary?.title}
                  </h3>
                  <Badge>{courseSummary?.status}</Badge>
                </div>
                <div className="flex gap-4 items-center flex-wrap">
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
                  {/* <div className="inline-flex items-center gap-1">
                    <Clock className="size-5 text-blue-600" />
                    <span className="text-slate-700 text-sm font-normal">
                      April 8, 2025
                    </span>
                  </div> */}
                </div>
              </div>
              {/* buttons */}
              <div className="flex flex-col lg:flex-row gap-4 items-center w-full lg:w-fit">
                <Button variant="outline" className="w-full lg:w-fit" asChild>
                  <Link href="/syllabus">
                    <Eye className="size-5 text-primary" /> View Syllabus
                  </Link>
                </Button>

                {courseSummary?.status !== "not_enrolled" && (
                  <Button variant="outline" className="w-full lg:w-fit">
                    <DocumentArrowDown className="size-5 text-primary" />{" "}
                    Generate Report
                  </Button>
                )}

                {courseSummary?.status === "not_enrolled" && (
                  <Button
                    variant="secondary"
                    className="w-full lg:w-fit"
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
                {courseSummary?.status === "completed" && (
                  <DownloadCertificate />
                )}
                {courseSummary?.status === "ongoing" && (
                  <Button variant="secondary" asChild>
                    <Link
                      href={`/courses/${courseSummary.id}/days/${
                        courseSummary.ongoing_day
                      }/topics/${
                        courseSummary.ongoing_quiz
                          ? "quiz"
                          : courseSummary.ongoing_assignment
                          ? "assignment"
                          : courseSummary.ongoing_lesson
                      }`}
                    >
                      Continue Course
                      <ChevronRight className="size-5 text-white" />
                    </Link>
                  </Button>
                )}
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
    </>
  );
};
export default MyCourse;
