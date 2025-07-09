/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { test } from "./components/const";
import MatchQuestionItem from "./components/matchQuestion";

interface Answer {
  quiz_id: number;
  questions: {
    question_id: number;
    option_id: number[];
  }[];
}

const QuizRunner = ({ handleStatus }: { handleStatus: any }) => {
  const params = useParams();
  const courseID = params.courseid;

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuiz = test?.total_quiz || 0;
  const currentQuiz = test?.quizzes?.[currentQuizIndex];

  const [timeLeft, setTimeLeft] = useState(2 * 60 || 0);

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      single_answer: null as number | null,
      multiple_answer: [] as number[],
      matching_answers: {} as { [key: string]: any },
    },
    mode: "onChange",
  });

  // Load saved answer when changing questions
  useEffect(() => {
    const savedAnswer = answers.find((a) => a.quiz_id === currentQuiz?.id);
    if (savedAnswer) {
      const formValues = {
        single_answer: null as number | null,
        multiple_answer: [] as number[],
        matching_answers: {} as { [key: string]: any },
      };

      if (currentQuiz?.type === "matching") {
        savedAnswer.questions.forEach((q) => {
          formValues.matching_answers[q.question_id] = q.option_id[0];
        });
      } else if (currentQuiz?.type === "multiple_choice") {
        formValues.multiple_answer = savedAnswer.questions[0]?.option_id || [];
      } else {
        formValues.single_answer =
          savedAnswer.questions[0]?.option_id?.[0] || null;
      }

      reset(formValues);
    } else {
      reset({
        single_answer: null,
        multiple_answer: [],
        matching_answers: {} as { [key: string]: any },
      });
    }
  }, [currentQuizIndex, currentQuiz?.id, currentQuiz?.type, answers, reset]);

  const submitAllAnswers = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Save the current answer before final submission
      const currentFormData = getValues();
      saveCurrentAnswer(currentFormData);

      const submissionData = {
        course_id: courseID,
        test_id: test?.id,
        payload: answers,
      };

      console.log("Final Submission Data:", submissionData);

      // const response = await submitQuizAnswer(submissionData).unwrap();
      const response = {
        data: {
          test_completed: true,
        },
      };

      if (response.data.test_completed === true) {
        handleStatus("completed");
      }
    } catch (error: any) {
      toast.error(error.data.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Timer countdown and auto-submit when time is up
  useEffect(() => {
    if (timeLeft <= 0) {
      // Time is up, submit all answers
      submitAllAnswers();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handlePreviousQuestion = () => {
    setCurrentQuizIndex((prev) => prev - 1);
  };

  const handleNextQuestion = (formData: any) => {
    saveCurrentAnswer(formData);
    setCurrentQuizIndex((prev) => prev + 1);
  };

  const saveCurrentAnswer = (formData: any) => {
    if (!currentQuiz) return;

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

    const newAnswer = {
      quiz_id: currentQuiz.id,
      questions: questionsPayload,
    };

    setAnswers((prev) => {
      const existingIndex = prev.findIndex(
        (a: any) => a.quiz_id === currentQuiz.id
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newAnswer;
        return updated;
      }
      return [...prev, newAnswer];
    });
  };

  const onSubmit = async (formData: any) => {
    await submitAllAnswers();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center mb-3 px-4 lg:px-6">
        <div className="flex gap-2 text-slate-600 items-center">
          <QuestionCircle className="size-5" />
          <h3 className="text-lg font-semibold">
            Question {currentQuizIndex + 1}/{totalQuiz}
          </h3>
        </div>

        {timeLeft <= 0 ? (
          <div className="flex gap-2">
            <Timer className="size-5 text-red-500" />
            <span className="text-red-500">Time&apos;s up!</span>{" "}
          </div>
        ) : (
          <div className="flex gap-2 text-blue-500">
            <Timer className="size-5" />
            Time left {formatSecondsToReadableTime(timeLeft)}
          </div>
        )}
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
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value as unknown as string}
                className="gap-0"
              >
                {(currentQuiz?.questions as any).options?.map((option: any) => (
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
            )}
          />
        )}

        {/* Multiple Choice */}
        {currentQuiz?.type === "multiple_choice" && (
          <Controller
            name="multiple_answer"
            control={control}
            render={({ field }) => {
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
            ).map((question) => (
              <MatchQuestionItem
                key={question.id}
                question={question}
                control={control}
              />
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-between items-center px-4 lg:px-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              handleSubmit(saveCurrentAnswer)();
              handlePreviousQuestion();
            }}
            disabled={currentQuizIndex === 0 || timeLeft <= 0}
          >
            Prev
          </Button>
          {currentQuizIndex === totalQuiz - 1 ? (
            <Button
              type="submit"
              variant={"secondary"}
              disabled={timeLeft <= 0 || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit All Answers"}
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              onClick={handleSubmit(handleNextQuestion)}
              disabled={currentQuizIndex === totalQuiz - 1 || timeLeft <= 0}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default QuizRunner;
