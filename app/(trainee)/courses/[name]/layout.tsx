/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  cn,
  formatSecondsToReadableTime,
  getCurrentWeekAndDay,
} from "@/lib/utils";
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
} from "@/components/icons";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/partials";
import { useState } from "react";
import { DayProgress } from "./[id]/components";
import { useGetModulesQuery } from "@/features/course/modulesApi";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const { data, isLoading, isFetching } = useGetModulesQuery({ id: 1 });

  const modules = data?.data;

  if (isLoading || isFetching) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-144px)] lg:min-h-[calc(100vh-184px)]">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }
  const courseContentId = typeof params.id === "string" ? params.id : "";

  const { currentWeek, currentDay } = getCurrentWeekAndDay(
    courseContentId,
    modules ?? { weeks: [] }
  );
  console.log("Current Week:", currentWeek);
  console.log("Current Day:", currentDay);

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
        <div className="overflow-y-auto max-h-[calc(100vh-300px)] lg:max-h-[calc(100vh-350px)] lg-4 lg:pb-6">
          <Accordion
            type="single"
            collapsible
            defaultValue={currentWeek?.toString()}
          >
            <div className="px-4 lg:px-6 flex flex-col gap-2">
              {modules?.weeks?.map((week: any) => (
                <AccordionItem
                  key={week.weekNumber}
                  value={String(week.weekNumber)}
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
                      defaultValue={currentDay?.toString()}
                    >
                      <div className="flex flex-col gap-2">
                        {week?.days?.map((day: any) => (
                          <AccordionItem
                            key={day.dayNumber}
                            value={String(day.dayNumber)}
                            className="px-0 border-none my-0 overflow-hidden"
                          >
                            <AccordionTrigger className="px-4 py-3 bg-slate-100 rounded-none">
                              <h3 className="text-primary text-base font-medium">
                                Day {day.dayNumber}: {day.title}
                              </h3>
                            </AccordionTrigger>

                            <AccordionContent className="bg-slate-100 px-4">
                              <hr className="border-slate-200" />
                              <div className="mt-2.5 flex flex-col gap-2.5">
                                {day?.topics?.map((topic: any) => {
                                  const isCompleted = topic?.isCompleted;
                                  const isActive =
                                    topic.id === Number(params.id);

                                  return (
                                    <Link
                                      key={topic?.title}
                                      href={topic?.id?.toString()}
                                      className="px-4"
                                    >
                                      <div className="flex gap-2">
                                        {isCompleted ? (
                                          <CheckCircleMark className="size-6 text-blue-500" />
                                        ) : (
                                          <CheckCircleMarkOutline
                                            className={cn(
                                              "size-6 text-primary",
                                              {
                                                "text-blue-500": isActive,
                                              }
                                            )}
                                          />
                                        )}

                                        <div className="flex flex-col gap-0.5">
                                          <h3
                                            className={cn(
                                              "text-primary text-base font-medium",
                                              { "text-blue-500": isActive }
                                            )}
                                          >
                                            {topic.title}
                                          </h3>
                                          <div className="flex items-center gap-1">
                                            {topic.type === "media" && (
                                              <Video className="size-4 text-slate-500" />
                                            )}
                                            <span className="text-slate-500 text-xs">
                                              {formatSecondsToReadableTime(
                                                topic?.media_duration
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  );
                                })}
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
      </div>
    );
  };

  return (
    <div className="container flex gap-6 min-h-[calc(100vh-144px)] lg:min-h-[calc(100vh-184px)] my-4 lg:my-6">
      {/* Sidebar */}
      <aside className="hidden xl:block w-full max-w-[400px] bg-slate-50 border border-slate-200 rounded-2xl h-fit">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="p-4 lg:p-6 bg-slate-200 rounded-t-2xl flex justify-between items-center">
            <DayProgress />
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
          <DayProgress className="flex-1" />

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
                <DayProgress className="flex-1" />
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
