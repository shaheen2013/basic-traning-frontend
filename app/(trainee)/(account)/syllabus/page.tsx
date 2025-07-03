/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader } from "@/components/partials";
import { useGetSyllabusQuery } from "@/features/syllabus/syllabusApi";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

const Syllabus = () => {
  const { data, isLoading, isFetching } = useGetSyllabusQuery({});
  const content = data?.data?.syllabus;

  if (isLoading || isFetching) return <Loader />;
  return (
    <>
      <div className="flex items-center gap-2 font-semibold lg:text-2xl text-lg lg:py-6 lg:px-6 p-4 bg-slate-200 rounded-t-2xl capitalize">
        <Link href="/my-course">
          <ChevronLeftIcon className="size-6 lg:size-8 text-primary cursor-pointer" />
        </Link>
        Syllabus
      </div>
      <div className="p-4 lg:p-6 w-full">
        <h3 className="text-primary text-lg lg:text-2xl font-semibold mb-4 lg:mb-6">
          {content?.name}
        </h3>
        <h5 className="text-primary text-base lg:text-lg font-semibold mb-2 lg:mb-3">
          Course Overview
        </h5>
        <div
          className="prose mb-4 lg:mb-6 max-w-full"
          dangerouslySetInnerHTML={{ __html: content.overview }}
        />
        <div className="mb-4 lg:mb-6">
          {content?.syllabus_modules.map((module: any, index: number) => (
            <div key={index}>
              <h5 className="text-primary text-lg lg:text-2xl font-semibold mb-3 lg:mb-4">
                {module.title}
              </h5>

              {module.syllabus_module_blocks.map(
                (block: any, index: number) => (
                  <div key={index} className="mb-3 lg:mb-4">
                    <h5 className="text-primary text-base lg:text-lg font-semibold mb-2 lg:mb-3">
                      {block.title}
                    </h5>
                    <div
                      className="prose max-w-full"
                      dangerouslySetInnerHTML={{ __html: block.description }}
                    />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Syllabus;
