import { Assignment, LiveClass, Preview, Quiz, Video } from "./components";
import { type } from "./constant";

const Course = () => {
  return (
    <>
      {type === "video" && <Video />}
      {type === "live-class" && <LiveClass />}
      {type === "quiz" && <Quiz />}
      {type === "assignment" && <Assignment />}
      {type === "preview" && <Preview />}
    </>
  );
};

export default Course;
