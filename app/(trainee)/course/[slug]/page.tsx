import { LiveClass, Test, Vedio } from "./components";
import { type } from "./constant";

const Course = () => {
  return (
    <>
      {type === "video" && <Vedio />}
      {type === "live-class" && <LiveClass />}
      {type === "test" && <Test />}
    </>
  );
};

export default Course;
