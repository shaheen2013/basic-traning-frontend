"use client";

import { useParams } from "next/navigation";
import {
  Assignment,
  LiveClass,
  Lock,
  Preview,
  Quiz,
  Video,
} from "./components";
import { useGetCoursesVideoQuery } from "@/features/course/videoApi";
import { Loader } from "@/components/partials";

const Course = () => {
  const params = useParams();
  const courseId = params.courseid;
  const topicId = params.topicid;
  const { data, isLoading, isFetching, isError, error } =
    useGetCoursesVideoQuery({
      courseId: courseId,
      topicId: topicId,
    });

  const courseData = data?.data;

  const courseStatus = courseData?.type;

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError && "status" in error && error.status === 403) return <Lock />;

  return (
    <>
      {courseStatus === "media" && <Video data={courseData} />}
      {courseStatus === "zoom" && <LiveClass data={courseData} />}
      {courseStatus === "quiz" && <Quiz data={courseData} />}
      {courseStatus === "assignment" && <Assignment data={courseData} />}
      {courseStatus === "preview" && <Preview data={courseData} />}
    </>
  );
};

export default Course;
