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
import { useGetQuizQuestionsQuery } from "@/features/course/quizApi";
import { formatSecondsToReadableTime } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const QuizRunner = () => {
  // starting will be from ongoing
  const params = useParams();
  const courseID = params.courseid;
  const dayID = params.dayid;

  const { data, isLoading, isFetching } = useGetQuizQuestionsQuery({
    courseId: courseID,
    dayId: dayID,
  });

  const questions = data?.data?.test_paper;

  console.log("questions", questions);
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      answers: {},
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Submitted Answers:", data.answers);
  };

  if (isLoading || isFetching) return <Loader />;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-3 px-4 lg:px-6">
          <div className="flex gap-2 text-slate-600 items-center">
            <QuestionCircle className="size-5" />
            <h3 className="text-lg font-semibold">Question 1/10</h3>
          </div>
          <div className="flex gap-2 text-blue-500">
            <Timer className="size-5" />
            Time left {formatSecondsToReadableTime(1000)}
          </div>
        </div>
        {questions?.quizzes?.map((question: any) => (
          <>
            <p className="text-lg text-primary font-semibold mb-4 px-4 lg:px-6">
              {question.title}
            </p>

            <div className="mb-6">
              {/* Single or True/False */}
              {(question.questions.type === "single" ||
                question.questions.type === "true_or_false") && (
                <Controller
                  name={`answers.${question.questions.id}`}
                  control={control}
                  rules={{ required: "Please select an option" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value as string} // Explicit type assertion
                        className="gap-0"
                      >
                        {question.questions.options.map((option: any) => (
                          <div
                            key={option.id}
                            className="flex items-center gap-2 py-4 px-4 lg:px-6 border-t border-slate-200 last:border-b"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={option.id}
                            />
                            <Label htmlFor={option.id}>{option.text}</Label>
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

              {/* Multiple Select */}
              {question.questions.type === "multiple" && (
                <Controller
                  name={`answers.${question.questions.id}`}
                  control={control}
                  rules={{
                    validate: (value) =>
                      (value as string[])?.length > 0 ||
                      "Please select at least one option",
                  }}
                  render={({ field, fieldState: { error } }) => {
                    const handleCheckboxChange = (
                      checked: boolean,
                      value: string
                    ) => {
                      const current = (field.value as string[]) || [];
                      if (checked) {
                        field.onChange([...current, value]);
                      } else {
                        field.onChange(current.filter((v) => v !== value));
                      }
                    };

                    return (
                      <>
                        {question.questions.options.map((option: any) => (
                          <div
                            key={option.id}
                            className="flex items-center gap-2 py-4 px-4 lg:px-6 border-t border-slate-200 last:border-b"
                          >
                            <Checkbox
                              id={option.id}
                              checked={(field.value as string[])?.includes(
                                option.value
                              )}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(
                                  checked as boolean,
                                  option.value
                                )
                              }
                            />
                            <Label htmlFor={option.id}>{option.text}</Label>
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
              {question.questions.type === "match" &&
                question.questions.type.map((option: any) => (
                  <Controller
                    key={option.id}
                    name={`answers.${question.questions.id}.${option.id}`}
                    control={control}
                    rules={{ required: "Please select a match" }}
                    render={({ field, fieldState: { error } }) => (
                      <div className="py-4 px-4 lg:px-6 border-t border-slate-200 flex flex-col last:border-b">
                        <div className="flex justify-between items-center">
                          <p className="text-slate-700 text-base font-medium">
                            {option.text}
                          </p>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value as string} // Explicit type assertion
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select matching" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {option.ansOptions.map((ansOption: any) => (
                                  <SelectItem
                                    key={ansOption.id}
                                    value={ansOption.value}
                                  >
                                    {ansOption.text}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        {error && (
                          <span className="text-sm text-red-500 block mt-2">
                            {error.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-end px-4 lg:px-6">
              <Button type="submit" variant="secondary">
                Submit Quiz
              </Button>
            </div>
          </>
        ))}
      </form>
    </>
  );
};
export default QuizRunner;
