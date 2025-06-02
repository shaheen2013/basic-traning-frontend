import { LiveClass, QuizInstructions, Vedio } from "./components";
import { type } from "./constant";

const Course = () => {
  return (
    <>
      {type === "video" && <Vedio />}
      {type === "live-class" && <LiveClass />}
      {type === "quiz" && <QuizInstructions />}
    </>
  );
};

export default Course;
