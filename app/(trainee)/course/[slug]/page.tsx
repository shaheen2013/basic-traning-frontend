import { Assignment, LiveClass, Quiz, Vedio } from "./components";
import { type } from "./constant";

const Course = () => {
  return (
    <>
      {type === "video" && <Vedio />}
      {type === "live-class" && <LiveClass />}
      {type === "quiz" && <Quiz />}
      {type === "assignment" && <Assignment />}
    </>
  );
};

export default Course;
