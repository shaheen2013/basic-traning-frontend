"use client";

import { useParams } from "next/navigation";
import { Assignment, LiveClass, Preview, Quiz, Video } from "./components";
import { useGetCoursesVideoQuery } from "@/features/course/videoApi";
import { Loader } from "@/components/partials";

const Course = () => {
  const params = useParams();
  const { data, isLoading, isFetching } = useGetCoursesVideoQuery({
    courseId: 1,
    topicId: params.id as string,
  });

  const courseData = data?.data;

  const courseStatus = courseData?.type;

  if (isLoading || isFetching) {
    return <Loader />;
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
