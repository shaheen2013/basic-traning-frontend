/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionCircle, Timer } from "@/components/icons";
import { Loader } from "@/components/partials";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  useGetQuizQuestionsQuery,
  useSubmitQuizAnswerMutation,
} from "@/features/course/quizApi";
import { formatSecondsToReadableTime } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import MatchQuestionItem from "./components/matchQuestion";

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

  const test = data?.data?.test_paper;
  const totalQuiz = test?.total_quiz || 0;
  const currentQuiz = test?.quizzes?.[currentQuizIndex];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      answer: [],
      answers:
        currentQuiz?.type === "matching"
          ? Array.isArray(currentQuiz.questions)
            ? Object.fromEntries(
                currentQuiz.questions.map((q: any) => [q.id, ""])
              )
            : { [currentQuiz.questions.id]: "" }
          : {},
    },
    mode: "onChange",
  });

  console.log("errors", errors);
  const onSubmit = async (formData: any) => {
    if (!currentQuiz) return;

    const questionsPayload =
      currentQuiz.type === "matching"
        ? Object.entries(formData.answers || {}).map(
            ([questionId, optionId]) => ({
              question_id: Number(questionId),
              option_id: [optionId].filter(Boolean),
            })
          )
        : [
            {
              question_id: currentQuiz.questions.id,
              option_id: Array.isArray(formData.answer)
                ? formData.answer
                : [formData.answer],
            },
          ];

    try {
      const submissionData = {
        course_id: courseID,
        test_id: test?.id,
        payload: {
          quiz_id: currentQuiz.id,
          questions: questionsPayload,
        },
      };

      const response = await submitQuizAnswer(submissionData).unwrap();
      if (response.data.test_completed === true) {
        handleStatus("completed");
      }

      if (currentQuizCount !== totalQuiz) {
        setCurrentQuizCount(currentQuizCount + 1);
      }

      if (currentQuizIndex < totalQuiz - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        // Completely reset form with proper defaults for next question
        reset(
          {
            answer: currentQuiz.type === "multiple_choice" ? [] : undefined,
            answers: {},
          },
          {
            keepErrors: false, // Clear all errors
            keepDefaultValues: false,
          }
        );
        // Clear any potential error state
        clearErrors();
      }
    } catch (error: any) {
      toast.error(error.data.message || "Something went wrong.");
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
          Time left {formatSecondsToReadableTime(currentQuiz?.time_limit * 60)}
        </div>
      </div>

      <p className="text-lg text-primary font-semibold mb-4 px-4 lg:px-6">
        {currentQuiz.title}
      </p>

      <div className="mb-6">
        {/* Single or True/False */}
        {(currentQuiz.type === "single" ||
          currentQuiz.type === "true_or_false") && (
          <Controller
            name="answer"
            control={control}
            rules={{ required: "Please select an option true or false" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value as unknown as string}
                  className="gap-0"
                >
                  {currentQuiz.questions.options.map((option: any) => (
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
                  ))}
                </RadioGroup>
                {error && (
                  <span className="text-sm text-red-500 block m-2">
                    {error.message}
                  </span>
                )}
              </>
            )}
          />
        )}

        {currentQuiz.type === "multiple_choice" && (
          <Controller
            name="answer"
            control={control}
            rules={{
              validate: (value) => {
                // Only validate if current question is multiple_choice
                if (currentQuiz.type !== "multiple_choice") return true;
                return (
                  (value as number[])?.length > 0 ||
                  "Please select at least one option"
                );
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
                  {currentQuiz.questions.options.map((option: any) => (
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
                    <span className="text-sm text-red-500 block m-2">
                      {error.message}
                    </span>
                  )}
                </>
              );
            }}
          />
        )}

        {/* Match Type */}
        {currentQuiz.type === "matching" && (
          <div className="space-y-4">
            {/* Handle both array and object cases for questions */}
            {Array.isArray(currentQuiz.questions) ? (
              currentQuiz.questions.map((question: any) => (
                <MatchQuestionItem
                  key={question.id}
                  question={question}
                  control={control}
                />
              ))
            ) : (
              <MatchQuestionItem
                key={currentQuiz.questions.id}
                question={currentQuiz.questions}
                control={control}
              />
            )}
          </div>
        )}

        {/* Submit button */}
        <div className="flex justify-end px-4 lg:px-6 mt-6">
          <Button type="submit" disabled={isSubmitting} variant={"secondary"}>
            Submit Answer
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QuizRunner;
