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
  const { data, isLoading, isFetching } = useGetCoursesVideoQuery({
    courseId: courseId,
    topicId: topicId,
  });

  const courseData = data?.data;

  const courseStatus = "assignment";

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (false) return <Lock />;

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
