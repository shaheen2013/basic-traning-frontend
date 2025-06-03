import { LiveClass, Quiz, Vedio } from "./components";
import { type } from "./constant";

const Course = () => {
  return (
    <>
      {type === "video" && <Vedio />}
      {type === "live-class" && <LiveClass />}
      {type === "quiz" && <Quiz />}
    </>
  );
};

export default Course;
