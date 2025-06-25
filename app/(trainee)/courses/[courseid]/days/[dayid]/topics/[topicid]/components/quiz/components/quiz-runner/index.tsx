import { useGetQuizQuestionsQuery } from "@/features/course/quizApi";
import { useParams } from "next/navigation";

const QuizRunner = () => {
  // starting will be from ongoing
  const params = useParams();
  const courseID = params.courseid;
  const dayID = params.dayid;

  const { data, isLoading, isFetching } = useGetQuizQuestionsQuery({
    courseId: courseID,
    dayId: dayID,
  });

  console.log({ data, isLoading, isFetching });
  return <div>QuizRunner</div>;
};
export default QuizRunner;
