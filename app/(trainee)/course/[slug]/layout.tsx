"use client";

import { Progress } from "@/components/ui/progress";
import { progress } from "../../(account)/my-course/constant";
import { Input } from "@/components/ui/input";

import {
  CheckCircleMark,
  CheckCircleMarkOutline,
  Plus,
  Search,
  Subtract,
  Video,
} from "@/components/icons";
import { courseData } from "./constant";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();

  const currentWeek =
    typeof params.slug === "string" ? params.slug.split("-")[0] : undefined;
  const currentDay =
    typeof params.slug === "string" ? params.slug.split("-")[1] : undefined;

  return (
    <div className="container flex gap-6 min-h-[calc(100vh-144px] lg:min-h-[calc(100vh-184px)] my-4 lg:my-6">
      <div className="hidden xl:block max-w-[400px] w-full bg-slate-50 rounded-2xl border-slate-200 border">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="p-4 lg:p-6 bg-slate-200 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-semibold text-2xl text-primary">
              Running Day: 01
            </h3>
            <div className="flex gap-2 items-center">
              <Progress value={progress} className="w-24 bg-white" />
              <span className="text-sm font-semibold text-blue-500">1/4</span>
            </div>
          </div>
          <div className="px-4 lg:px-6">
            <Input
              type="text"
              placeholder="Search"
              className=""
              startIcon={<Search className="text-slate-600 size-6" />}
            />
          </div>

          <div className="overflow-y-auto lg:max-h-[calc(100vh-350px)]">
            <Accordion type="single" collapsible defaultValue={currentWeek}>
              <div className="px-4 lg:px-6 flex flex-col gap-2">
                {courseData.weeks.map((week) => (
                  <AccordionItem
                    value={String(week.weekNumber)}
                    key={week.weekNumber}
                    className="my-0"
                  >
                    <AccordionTrigger
                      icon={
                        <>
                          <Plus className="hidden group-data-[state=closed]:block transition-transform size-4 mt-1" />
                          <Subtract className="hidden group-data-[state=open]:block transition-transform size-4 mt-1" />
                        </>
                      }
                    >
                      {week.title}
                    </AccordionTrigger>

                    <AccordionContent>
                      <Accordion
                        type="single"
                        collapsible
                        defaultValue={currentDay}
                      >
                        <div className="flex flex-col gap-2">
                          {week.days.map((day) => (
                            <AccordionItem
                              value={String(day.dayNumber)}
                              key={day.dayNumber}
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
                                  {day.topics.map((topic) => {
                                    const isCompleted = topic.isCompleted;
                                    const isActive = topic.href === params.slug;
                                    return (
                                      <Link
                                        key={topic.title}
                                        href={topic.href}
                                        className="px-4"
                                      >
                                        <div className="flex gap-2">
                                          {isCompleted && (
                                            <CheckCircleMark className="size-6 text-blue-500" />
                                          )}
                                          {!isCompleted && (
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
                                                {
                                                  "text-blue-500":
                                                    topic.href === params.slug,
                                                }
                                              )}
                                            >
                                              {topic.title}
                                            </h3>
                                            <div className="flex items-center gap-1">
                                              {topic.type === "video" && (
                                                <Video className="size-4 text-slate-500" />
                                              )}
                                              <span className="text-slate-500 text-xs">
                                                {topic.duration}
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
      </div>

      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow">
        <h3 className="p-4 lg:p-6  bg-slate-200 font-semibold lg:text-2xl text-lg capitalize">
          My Course
        </h3>
        <div className="bg-slate-50 p-4 lg:p-6">{children}</div>
      </div>
    </div>
  );
}
