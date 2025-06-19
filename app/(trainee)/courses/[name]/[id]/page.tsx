"use client";

import { useParams } from "next/navigation";
import { Assignment, LiveClass, Preview, Quiz, Video } from "./components";
import { useGetCoursesVideoQuery } from "@/features/course/videoApi";

const Course = () => {
  const params = useParams();
  const { data, isLoading, isFetching } = useGetCoursesVideoQuery({
    courseId: 1,
    topicId: params.id as string,
  });

  const courseData = data?.data;

  const courseStatus = courseData?.type;

  if (isLoading || isFetching) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-144px)] lg:min-h-[calc(100vh-184px)]">
        Loading...
      </div>
    );
  }
  return (
    <>
      {courseStatus === "media" && <Video data={courseData} />}
      {courseStatus === "live-class" && <LiveClass data={courseData} />}
      {courseStatus === "quiz" && <Quiz data={courseData} />}
      {courseStatus === "assignment" && <Assignment data={courseData} />}
      {courseStatus === "preview" && <Preview data={courseData} />}
    </>
  );
};

export default Course;
