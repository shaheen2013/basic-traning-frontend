import { Assignment, LiveClass, Preview, Quiz, Video } from "./components";
import { type } from "./constant";

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
