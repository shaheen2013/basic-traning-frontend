import { type } from "../constant";
import { Assignment, LiveClass, Preview, Quiz, Video } from "./components";

type Status = "video" | "live-class" | "quiz" | "assignment" | "preview";

const courseStatus = type as Status;

const Course = () => {
  return (
    <>
      {courseStatus === "video" && <Video />}
      {courseStatus === "live-class" && <LiveClass />}
      {courseStatus === "quiz" && <Quiz />}
      {courseStatus === "assignment" && <Assignment />}
      {courseStatus === "preview" && <Preview />}
    </>
  );
};

export default Course;
