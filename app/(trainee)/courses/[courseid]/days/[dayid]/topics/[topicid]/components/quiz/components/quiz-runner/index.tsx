/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionCircle, Timer } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatSecondsToReadableTime } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import MatchQuestionItem from "./components/matchQuestion";
import {
  useGetQuizQuestionsQuery,
  useSubmitQuizAnswerMutation,
  useQuizCompleteMutation,
} from "@/features/course/quizApi";
import { Loader } from "@/components/partials";

const QuizRunner = ({ handleStatus }: { handleStatus: any }) => {
  const params = useParams();
  const courseID = params.courseid;
  const dayID = params.dayid;

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuizCount, setCurrentQuizCount] = useState(1);

  const { data, isLoading, isFetching } = useGetQuizQuestionsQuery({
    courseId: courseID,
    dayId: dayID,
  });

  const [submitQuizAnswer, { isLoading: isSubmitting }] =
    useSubmitQuizAnswerMutation();

  const [quizComplete, { isLoading: isCompleting }] = useQuizCompleteMutation();

  const test = data?.data?.test_paper;
  const totalQuiz = test?.total_quiz || 0;
  const currentQuiz = test?.quizzes?.[currentQuizIndex];

  const [timeLeft] = useState(currentQuiz?.time_limit * 60 || 0);

  const { control, handleSubmit, reset, clearErrors } = useForm({
    defaultValues: {
      single_answer: null,
      multiple_answer: [],
      matching_answers: {},
    },
    mode: "onChange",
  });

  // Reset form completely when question changes
  useEffect(() => {
    if (!currentQuiz) return;

    reset({
      single_answer: null,
      multiple_answer: [],
      matching_answers:
        currentQuiz.type === "matching"
          ? Array.isArray(currentQuiz.questions)
            ? Object.fromEntries(
                currentQuiz.questions.map((q: any) => [q.id, ""])
              )
            : { [currentQuiz.questions.id]: "" }
          : {},
    });
    clearErrors();
  }, [currentQuiz, reset, clearErrors]);

  // Timer countdown
  // useEffect(() => {
  //   if (!currentQuiz || timeLeft <= 0) return;

  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [currentQuizIndex, currentQuiz, timeLeft]);

  // Reset timer when quiz changes
  // useEffect(() => {
  //   setTimeLeft(currentQuiz?.time_limit * 60 || 0);
  // }, [currentQuiz]);

  const onSubmit = async (formData: any) => {
    console.log("formData clicked", formData);
    if (!currentQuiz) return;

    try {
      let questionsPayload;

      if (currentQuiz.type === "matching") {
        questionsPayload = Object.entries(formData.matching_answers || {}).map(
          ([questionId, optionId]) => ({
            question_id: Number(questionId),
            option_id: [optionId].filter(Boolean),
          })
        );
      } else if (currentQuiz.type === "multiple_choice") {
        questionsPayload = [
          {
            question_id: Array.isArray(currentQuiz.questions)
              ? currentQuiz.questions[0].id
              : currentQuiz.questions.id,
            option_id: formData.multiple_answer || [],
          },
        ];
      } else {
        questionsPayload = [
          {
            question_id: Array.isArray(currentQuiz.questions)
              ? currentQuiz.questions[0].id
              : currentQuiz.questions.id,
            option_id: formData.single_answer ? [formData.single_answer] : [],
          },
        ];
      }

      const submissionData = {
        course_id: courseID,
        test_id: test?.id,
        payload: {
          quiz_id: currentQuiz.id,
          questions: questionsPayload,
        },
      };

      console.log("Submission Data:", submissionData);

      const response = await submitQuizAnswer(submissionData).unwrap();

      if (response.data.ongoing_quiz === null) {
        handleQuizComplete();
        handleStatus("completed");
      }

      if (currentQuizCount !== totalQuiz) {
        setCurrentQuizCount(currentQuizCount + 1);
      }

      if (currentQuizIndex < totalQuiz - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
      }
    } catch (error: any) {
      toast.error(error.data.message || "Something went wrong.");
    }
  };

  const handleQuizComplete = async () => {
    const payload = {
      course_id: courseID,
      test_id: test?.id,
    };
    try {
      await quizComplete(payload).unwrap();
      handleStatus("completed");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };
  if (isLoading || isFetching) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center mb-3 px-4 lg:px-6">
        <div className="flex gap-2 text-slate-600 items-center">
          <QuestionCircle className="size-5" />
          <h3 className="text-lg font-semibold">
            Question {currentQuizCount}/{totalQuiz}
          </h3>
        </div>
        <div className="flex gap-2 text-blue-500">
          <Timer className="size-5" />
          Time left {formatSecondsToReadableTime(timeLeft)}
        </div>
      </div>

      <p className="text-lg text-primary font-semibold mb-4 px-4 lg:px-6">
        {currentQuiz?.title}
      </p>

      <div className="mb-6">
        {/* Single or True/False */}
        {(currentQuiz?.type === "single" ||
          currentQuiz?.type === "true_or_false") && (
          <Controller
            name="single_answer"
            control={control}
            rules={{
              required: timeLeft > 0 ? "Please select an option" : false,
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value as unknown as string}
                  className="gap-0"
                >
                  {(currentQuiz?.questions as any).options?.map(
                    (option: any) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-2 py-4 px-4 lg:px-6 border-t border-slate-200 last:border-b"
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`option-${option.id}`}
                        />
                        <Label htmlFor={`option-${option.id}`}>
                          {option.value}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
                {error && (
                  <span className="text-sm text-red-500 block mx-6 my-3">
                    {error.message}
                  </span>
                )}
              </>
            )}
          />
        )}

        {/* Multiple Choice */}
        {currentQuiz?.type === "multiple_choice" && (
          <Controller
            name="multiple_answer"
            control={control}
            rules={{
              validate: (value) => {
                return timeLeft > 0
                  ? (value as number[])?.length > 0 ||
                      "Please select at least one option"
                  : false;
              },
            }}
            render={({ field, fieldState: { error } }) => {
              const handleCheckboxChange = (
                checked: boolean,
                value: number
              ) => {
                const current = (field.value as number[]) || [];
                if (checked) {
                  field.onChange([...current, value]);
                } else {
                  field.onChange(current.filter((v) => v !== value));
                }
              };

              return (
                <>
                  {(currentQuiz.questions as any).options.map((option: any) => (
                    <div
                      key={option.id}
                      className="flex items-center gap-2 py-4 px-4 lg:px-6 border-t border-slate-200 last:border-b"
                    >
                      <Checkbox
                        id={`option-${option.id}`}
                        checked={(field.value as number[])?.includes(option.id)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(checked as boolean, option.id)
                        }
                        aria-labelledby={`label-${option.id}`}
                      />
                      <Label
                        htmlFor={`option-${option.id}`}
                        id={`label-${option.id}`}
                      >
                        {option.value}
                      </Label>
                    </div>
                  ))}
                  {error && (
                    <span className="text-sm text-red-500 block mx-6 my-3">
                      {error.message}
                    </span>
                  )}
                </>
              );
            }}
          />
        )}

        {currentQuiz?.type === "matching" && (
          <div className="space-y-4" aria-live="polite">
            {(Array.isArray(currentQuiz.questions)
              ? currentQuiz.questions
              : [currentQuiz.questions]
            ).map((question: any) => (
              <MatchQuestionItem
                key={question.id}
                question={question}
                control={control}
                timeLeft={timeLeft}
              />
            ))}
          </div>
        )}
        {/* Submit button */}
        <div className="flex justify-end px-4 lg:px-6 mt-6">
          <Button
            type="submit"
            variant={"secondary"}
            disabled={isSubmitting || isCompleting}
          >
            Submit Answer
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QuizRunner;
