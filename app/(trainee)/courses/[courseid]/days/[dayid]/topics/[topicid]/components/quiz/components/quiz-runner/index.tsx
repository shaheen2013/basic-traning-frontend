/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionCircle, Timer } from "@/components/icons";
import { Loader } from "@/components/partials";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetQuizQuestionsQuery,
  useSubmitQuizAnswerMutation,
} from "@/features/course/quizApi";
import { formatSecondsToReadableTime } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const QuizRunner = ({ handleStatus }: { handleStatus: any }) => {
  const params = useParams();
  const courseID = params.courseid;
  const dayID = params.dayid;

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [submittedQuiz, setSubmittedQuiz] = useState<number[]>([]);

  console.log("Submitted Quiz:", submittedQuiz);

  const { data, isLoading, isFetching } = useGetQuizQuestionsQuery({
    courseId: courseID,
    dayId: dayID,
  });

  const [submitQuizAnswer, { isLoading: isSubmitting }] =
    useSubmitQuizAnswerMutation();

  const test = data?.data?.test_paper;
  const totalQuiz = test?.total_quiz || 0;
  const currentQuiz = test?.quizzes?.[currentQuizIndex];
  const allQuizSubmitted = submittedQuiz.length === totalQuiz;

  const [timeLeft, setTimeLeft] = useState(currentQuiz?.time_limit || 0);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      answer: [],
      answers:
        currentQuiz?.type === "matching"
          ? Object.fromEntries(
              currentQuiz.questions.map((q: any) => [q.id, ""])
            )
          : {},
    },
    mode: "onChange",
  });

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
      setSubmittedQuiz((prev) => [...prev, currentQuiz.id]);

      if (currentQuizIndex < totalQuiz - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        reset({ answer: [] });
      }
    } catch (error: any) {
      toast.error(error.data.message || "Something went wrong.");
    }
  };

  // useEffect(() => {
  //   if (!currentQuiz?.time_limit || isSubmitting) return;

  //   const timer = setInterval(() => {
  //     setTimeLeft((prev: any) => {
  //       if (prev <= 1) {
  //         clearInterval(timer);
  //         if (!isSubmitting) {
  //           handleSubmit(onSubmit)();
  //         }
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [currentQuizIndex, currentQuiz?.time_limit, isSubmitting]);

  if (isLoading || isFetching) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center mb-3 px-4 lg:px-6">
        <div className="flex gap-2 text-slate-600 items-center">
          <QuestionCircle className="size-5" />
          <h3 className="text-lg font-semibold">
            Question {submittedQuiz.length}/{totalQuiz}
          </h3>
        </div>
        <div className="flex gap-2 text-blue-500">
          <Timer className="size-5" />
          {/* Time left {formatSecondsToReadableTime(currentQuiz.time_limit * 60)} */}
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
            rules={{ required: "Please select an option" }}
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
              validate: (value) =>
                (value as number[])?.length > 0 ||
                "Please select at least one option",
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
        {/* Match Type */}
        {currentQuiz.type === "matching" && (
          <div className="space-y-4">
            {currentQuiz?.questions?.map((question: any) => (
              <div
                key={question.id}
                className="py-4 px-4 lg:px-6 border-t border-slate-200 flex flex-col last:border-b"
              >
                <div className="flex justify-between items-center gap-4">
                  <h4 className="text-slate-700 text-base font-medium">
                    {question.title}
                  </h4>
                  <Controller
                    name={`answers.${question.id}`}
                    control={control}
                    rules={{ required: "Please select a match" }}
                    render={({ field, fieldState: { error } }) => {
                      // Find the selected option to display its value
                      const selectedOption = question.options.find(
                        (opt: any) =>
                          opt.id.toString() === field.value?.toString()
                      );

                      return (
                        <>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select match">
                                {selectedOption?.value || "Select match"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {question.options.map((option: any) => (
                                  <SelectItem
                                    key={option.id}
                                    value={option.id.toString()}
                                  >
                                    {option.value}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {error && (
                            <span className="text-sm text-red-500 block mt-2">
                              {error.message}
                            </span>
                          )}
                        </>
                      );
                    }}
                  />
                </div>
              </div>
            ))}
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
