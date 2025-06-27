/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { Loader } from "@/components/partials";
import { useGetCoursesLessonsQuery } from "@/features/course/videoApi";
import { useGetQuizQuery } from "@/features/course/quizApi";
import { useGetAssignmentQuery } from "@/features/course/assigmentsApi";

const Course = () => {
  const params = useParams();
  const courseId = params.courseid;
  const dayId = params.dayid;
  const topicId = params.topicid;

  // Main course data fetch (skipped for quiz and assignment)
  const { data, isLoading, isFetching, isError, error } =
    useGetCoursesLessonsQuery(
      {
        courseId: courseId,
        topicId: topicId,
      },
      {
        skip: topicId === "quiz" || topicId === "assignment",
      }
    );

  // Quiz data fetch
  const {
    data: quizData,
    isLoading: quizLoading,
    isFetching: quizFetching,
    isError: quizIsError,
    error: quizError,
  } = useGetQuizQuery(
    {
      courseId: courseId,
      dayId: dayId,
    },
    {
      skip: topicId !== "quiz",
    }
  );

  // Assignment data fetch
  const {
    data: assignmentData,
    isLoading: assignmentLoading,
    isFetching: assignmentFetching,
    isError: assignmentIsError,
    error: assignmentError,
  } = useGetAssignmentQuery(
    {
      courseId: courseId,
      dayId: dayId,
    },
    {
      skip: topicId !== "assignment",
    }
  );

  // Determine which data to use based on topic type
  const contentData =
    topicId === "quiz"
      ? quizData?.data
      : topicId === "assignment"
      ? assignmentData?.data
      : data?.data;

  const contentStatus =
    topicId === "quiz"
      ? "quiz"
      : topicId === "assignment"
      ? "assignment"
      : data?.data?.type;

  // Loading states
  if (
    (topicId !== "quiz" &&
      topicId !== "assignment" &&
      (isLoading || isFetching)) ||
    (topicId === "quiz" && (quizLoading || quizFetching)) ||
    (topicId === "assignment" && (assignmentLoading || assignmentFetching))
  ) {
    return <Loader />;
  }

  // Error handling
  if (
    (isError && "status" in error && error.status === 403) ||
    (quizIsError && "status" in quizError && quizError.status === 403) ||
    (assignmentIsError &&
      "status" in assignmentError &&
      assignmentError.status === 403)
  ) {
    return <Lock />;
  }

  return (
    <>
      {contentStatus === "media" && <Video data={contentData} />}
      {contentStatus === "zoom" && <LiveClass data={contentData} />}
      {/* {contentStatus === "preview" && <Preview data={contentData} />} */}
      {contentStatus === "quiz" && <Quiz data={contentData} />}
      {/* {contentStatus === "assignment" && <Assignment data={contentData} />} */}
    </>
  );
};

export default Course;
