/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { cn, formatSecondsToReadableTime, textToSlug } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  CheckCircleMark,
  CheckCircleMarkOutline,
  Plus,
  Subtract,
  Search,
  Video,
  Hamburger,
  Dismiss,
  Lock,
  Unlock,
} from "@/components/icons";

import { Button } from "@/components/ui/button";
import { Loader, Modal } from "@/components/partials";
import { useEffect, useState } from "react";
import { useGetModulesQuery } from "@/features/course/modulesApi";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { shareModules } from "@/features/slice/modules";
import { DayProgress } from "./days/[dayid]/topics/[topicid]/components";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const courseId = params.courseid;
  const topicId = params.topicid;

  const { data, isLoading, isFetching } = useGetModulesQuery({
    id: courseId,
  });

  const modulesData = useSelector((state: any) => state.modules);

  console.log("modulesData", modulesData);

  const currentWeekID = modulesData?.course?.ongoing_week;
  const currentDayID = modulesData?.course?.ongoing_day;
  const currentTopicID = modulesData?.course?.ongoing_lesson;
  console.log("currentDayID", currentDayID);

  const currentDayData = modulesData?.weeks
    ?.find((week: any) => week.id === currentWeekID)
    ?.days?.find((day: any) => day.id === currentDayID);

  const totalDays = modulesData?.weeks?.reduce(
    (total: number, week: any) => total + (week.days?.length || 0),
    0
  );

  // Move state updates here
  useEffect(() => {
    if (data) {
      dispatch(shareModules(data.data));
    }
  }, [data, dispatch]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  const courseContent = () => {
    return (
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="px-4 lg:px-6">
          <Input
            type="text"
            placeholder="Search"
            startIcon={<Search className="text-slate-600 size-6" />}
          />
        </div>

        {/* Weeks and Days Accordion */}
        {currentDayID && currentWeekID && (
          <div className="overflow-y-auto max-h-[calc(100vh-300px)] lg:max-h-[calc(100vh-350px)] lg-4 lg:pb-6">
            <Accordion
              type="single"
              collapsible
              defaultValue={String(currentWeekID)}
            >
              <div className="px-4 lg:px-6 flex flex-col gap-2">
                {modulesData?.weeks?.map((week: any) => (
                  <AccordionItem
                    key={week.id + textToSlug(week.title)}
                    value={String(week.id)}
                    className="my-0"
                  >
                    <AccordionTrigger
                      icon={
                        <>
                          <Plus className="hidden group-data-[state=closed]:block size-4 mt-1 transition-transform" />
                          <Subtract className="hidden group-data-[state=open]:block size-4 mt-1 transition-transform" />
                        </>
                      }
                    >
                      {week.title}
                    </AccordionTrigger>

                    <AccordionContent>
                      <Accordion
                        type="single"
                        collapsible
                        defaultValue={String(currentDayID)}
                      >
                        <div className="flex flex-col gap-2">
                          {week?.days?.map((day: any) => (
                            <AccordionItem
                              key={day.id + textToSlug(day.title)}
                              value={String(day.id)}
                              className="px-0 border-none my-0 overflow-hidden"
                            >
                              <AccordionTrigger className="px-4 py-3 bg-slate-100 rounded-none">
                                <h3 className="text-primary text-base font-medium">
                                  {day.title}
                                </h3>
                              </AccordionTrigger>

                              <AccordionContent className="bg-slate-100 px-4">
                                <hr className="border-slate-200" />
                                <div className="mt-2.5 flex flex-col gap-2.5">
                                  {/* Topics */}
                                  {day?.topics?.map((topic: any) => {
                                    const isCompleted = topic?.is_completed;
                                    const isActive =
                                      topic.id === Number(topicId);
                                    const isUnlock =
                                      topic.id === currentTopicID &&
                                      !isActive &&
                                      !isCompleted;
                                    const isLocked =
                                      !isCompleted && !isActive && !isUnlock;

                                    return (
                                      <Link
                                        key={topic.id}
                                        href={
                                          isLocked ? "#" : topic.id.toString()
                                        }
                                        className="px-4"
                                      >
                                        <div className="flex gap-2">
                                          {/* Status Icon */}
                                          {isUnlock ? (
                                            <Unlock className="size-6 text-slate-700" />
                                          ) : isLocked ? (
                                            <Lock className="size-6 text-slate-700" />
                                          ) : isActive ? (
                                            <CheckCircleMarkOutline className="size-6 text-blue-500" />
                                          ) : (
                                            <CheckCircleMark className="size-6 text-blue-500" />
                                          )}

                                          {/* Content */}
                                          <div className="flex flex-col gap-0.5">
                                            <h3
                                              className={cn(
                                                "text-base font-medium",
                                                {
                                                  "text-blue-500": isActive,
                                                  "text-primary": !isActive,
                                                  "text-slate-500": isLocked,
                                                }
                                              )}
                                            >
                                              {topic.title}
                                            </h3>
                                            {topic.type === "media" && (
                                              <div className="flex items-center gap-1">
                                                <Video className="size-4 text-slate-500" />
                                                <span className="text-slate-500 text-xs">
                                                  {formatSecondsToReadableTime(
                                                    topic?.media_duration
                                                  )}
                                                </span>
                                              </div>
                                            )}
                                            {topic.type === "zoom" && (
                                              <div className="flex items-center gap-1">
                                                <Image
                                                  src="/icons/zoom.svg"
                                                  alt="Zoom"
                                                  className="size-5 grayscale-100"
                                                  width={20}
                                                  height={20}
                                                />
                                                <span className="text-slate-500 text-xs">
                                                  {formatSecondsToReadableTime(
                                                    topic?.zoom_duration || 3600
                                                  )}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                  {/* quiz */}
                                  {day?.quizzes?.has_quizzes &&
                                    (() => {
                                      const isCompleted =
                                        day.quizzes.is_completed;
                                      const isActive =
                                        day.id === Number(courseId) &&
                                        topicId === "quiz";
                                      const isUnlock =
                                        day.id === currentTopicID &&
                                        !isActive &&
                                        !isCompleted;
                                      const isLocked =
                                        !isCompleted && !isActive && !isUnlock;

                                      return (
                                        <Link
                                          href={isLocked ? "#" : "quiz"}
                                          className="px-4"
                                        >
                                          <div className="flex gap-2">
                                            {/* Status Icon */}
                                            {isUnlock ? (
                                              <Unlock className="size-6 text-slate-700" />
                                            ) : isLocked ? (
                                              <Lock className="size-6 text-slate-700" />
                                            ) : isActive ? (
                                              <CheckCircleMarkOutline className="size-6 text-blue-500" />
                                            ) : (
                                              <CheckCircleMark className="size-6 text-blue-500" />
                                            )}

                                            <div className="flex flex-col gap-0.5">
                                              <h3
                                                className={cn(
                                                  "text-base font-medium",
                                                  {
                                                    "text-blue-500": isActive,
                                                    "text-primary": !isActive,
                                                    "text-slate-500": isLocked,
                                                  }
                                                )}
                                              >
                                                Quiz
                                              </h3>
                                            </div>
                                          </div>
                                        </Link>
                                      );
                                    })()}
                                  {/* assignment */}
                                  {day?.assignment?.has_assignment &&
                                    (() => {
                                      const isCompleted =
                                        day.assignment.is_completed;
                                      const isActive =
                                        day.id === Number(courseId) &&
                                        topicId === "assignment";
                                      const isLocked =
                                        !isCompleted && !isActive;

                                      return (
                                        <Link
                                          href="assignment"
                                          className="px-4"
                                        >
                                          <div className="flex gap-2">
                                            {/* Status Icon */}
                                            {isLocked ? (
                                              <Lock className="size-6 text-slate-700" />
                                            ) : isActive ? (
                                              <CheckCircleMarkOutline className="size-6 text-blue-500" />
                                            ) : (
                                              <CheckCircleMark className="size-6 text-blue-500" />
                                            )}

                                            <div className="flex flex-col gap-0.5">
                                              <h3
                                                className={cn(
                                                  "text-base font-medium",
                                                  {
                                                    "text-blue-500": isActive,
                                                    "text-primary": !isActive,
                                                    "text-slate-500": isLocked,
                                                  }
                                                )}
                                              >
                                                assignment
                                              </h3>
                                            </div>
                                          </div>
                                        </Link>
                                      );
                                    })()}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </div>
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            </Accordion>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container flex gap-6 min-h-[calc(100vh-144px)] lg:min-h-[calc(100vh-184px)] my-4 lg:my-6">
      {/* Sidebar */}
      <aside className="hidden xl:block w-full max-w-[400px] bg-slate-50 border border-slate-200 rounded-2xl h-fit">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="p-4 lg:p-6 bg-slate-200 rounded-t-2xl flex justify-between items-center">
            <DayProgress
              currentDay={currentDayData?.day_number}
              totalDays={totalDays}
            />
          </div>
          {courseContent()}
        </div>
      </aside>

      <div className="flex-1 flex flex-col gap-6">
        <div className="lg:hidden flex justify-between items-center gap-2 bg-slate-200 p-4 rounded-2xl">
          <Button
            variant="outline"
            size="icon"
            className="shadow-none w-fit"
            onClick={() => setIsOpen(true)}
          >
            <Hamburger className="text-primary size-5" />
          </Button>
          <DayProgress
            className="flex-1"
            currentDay={currentDayData?.day_number}
            totalDays={totalDays}
          />

          <Modal
            open={isOpen}
            onOpenChange={setIsOpen}
            classes={{
              drawerContent:
                "h-full data-[vaul-drawer-direction=bottom]:max-h-[90vh]",
            }}
          >
            <div className="flex flex-col gap-4 lg:gap-6">
              <div className="flex justify-between items-center gap-2 bg-slate-100 p-4 rounded-2xl">
                <Button
                  variant="outline"
                  size="icon"
                  className="shadow-none w-fit border-none"
                  onClick={() => setIsOpen(false)}
                >
                  <Dismiss className="text-primary size-5" />
                </Button>
                <DayProgress
                  className="flex-1"
                  currentDay={currentDayData?.day_number}
                  totalDays={totalDays}
                />
              </div>
              {courseContent()}
            </div>
          </Modal>
        </div>

        {/* Main Content */}
        <main className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow h-fit">
          {children}
        </main>
      </div>
    </div>
  );
}
