// "use client";

// import {
//   ChevronLeft,
//   ChevronRight,
//   QuestionCircle,
//   Timer,
// } from "@/components/icons";
// import { QuizResult } from "@/components/partials";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { formatSecondsToReadableTime } from "@/lib/utils";
// import { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";

// const quizResponse = {
//   id: "1",
//   timeLimit: 60,
//   questions: [
//     {
//       id: "1",
//       text: "What is the capital of France?",
//       type: "single",
//       options: [
//         { id: "1-1", text: "London", value: "London" },
//         { id: "1-2", text: "Paris", value: "Paris" },
//         { id: "1-3", text: "Berlin", value: "Berlin" },
//         { id: "1-4", text: "Madrid", value: "Madrid" },
//       ],
//     },
//     {
//       id: "2",
//       text: "Which of these are programming languages?",
//       type: "multiple",
//       options: [
//         { id: "2-1", text: "HTML", value: "HTML" },
//         { id: "2-2", text: "JavaScript", value: "JavaScript" },
//         { id: "2-3", text: "CSS", value: "CSS" },
//         { id: "2-4", text: "Python", value: "Python" },
//       ],
//     },
//     {
//       id: "3",
//       text: "React is a JavaScript library for building user interfaces.",
//       type: "truefalse",
//       options: [
//         { id: "3-1", text: "True", value: "true" },
//         { id: "3-2", text: "False", value: "false" },
//       ],
//     },
//     {
//       id: "4",
//       text: "Match the following",
//       type: "match",
//       options: [
//         {
//           id: "4-1",
//           text: "Mount Everest is the tallest mountain on Earth. What country is it located in?",
//           ansOptions: [
//             { id: "4-1-1", text: "Nepal", value: "nepal" },
//             { id: "4-1-2", text: "China", value: "china" },
//           ],
//         },
//         {
//           id: "4-2",
//           text: "The Amazon Rainforest is often called the Earth's lungs. What continent is it in?",
//           ansOptions: [
//             { id: "4-2-1", text: "South America", value: "southAmerica" },
//             { id: "4-2-2", text: "North America", value: "northAmerica" },
//           ],
//         },
//       ],
//     },
//   ],
// };

// export default function StartQuiz() {
//   const [showResult, setShowResult] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [questionTimer, setQuestionTimer] = useState<number | null>(null);

//   const {
//     control,
//     handleSubmit,
//     trigger,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       answers: {},
//     },
//     mode: "onChange",
//   });
//   console.log({ errors });
//   const currentQuestion = quizResponse.questions[currentIndex];

//   const onSubmit = (data : any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
//     console.log("Submitted Answers:", data.answers);
//     setShowResult(true);
//   };

//   const handleNext = async () => {
//     const isValid = await trigger(`answers.${currentQuestion.id}`); 

//     if (!isValid) return;
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const handlePrevious = () => {
//     setCurrentIndex((prev) => prev - 1);
//   };

//   useEffect(() => {
//     if (quizResponse.timeLimit) {
//       setQuestionTimer(quizResponse.timeLimit);
//       const interval = setInterval(() => {
//         setQuestionTimer((prev) => {
//           if (prev === null) return null;
//           if (prev <= 1) {
//             clearInterval(interval);
//             handleSubmit(onSubmit)();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [handleSubmit]);

//   return (
//     <section className="bg-slate-50 flex flex-col gap-4 lg:gap-6 pb-4 lg:pb-6">
//       <div className="p-4 lg:p-6 bg-slate-200 flex justify-between items-center">
//         <h2 className="font-semibold text-lg lg:text-2xl capitalize text-primary">
//           My Course
//         </h2>
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="flex justify-between items-center mb-3 px-4 lg:px-6">
//           <div className="flex gap-2 text-slate-600 items-center">
//             <QuestionCircle className="size-5" />
//             <h3 className="text-lg font-semibold">
//               Question {currentIndex + 1}/{quizResponse.questions.length}
//             </h3>
//           </div>
//           {questionTimer !== null && (
//             <div className="flex gap-2 text-blue-500">
//               <Timer className="size-5" />
//               Time left {formatSecondsToReadableTime(questionTimer)}
//             </div>
//           )}
//         </div>

//         <p className="text-lg text-primary font-semibold mb-4 px-4 lg:px-6">
//           {currentQuestion.text}
//         </p>

//         <div className="mb-6">
//           {/* Single or True/False */}
//           {(currentQuestion.type === "single" ||
//             currentQuestion.type === "truefalse") && (
//             <Controller
//               name={`answers.${currentQuestion.id}` as string}
//               control={control}
//               rules={{ required: "Please select an option" }}
//               render={({ field, fieldState: { error } }) => (
//                 <>
//                   <RadioGroup
//                     onValueChange={field.onChange}
//                     value={field.value}
//                     className="gap-0"
//                   >
//                     {currentQuestion.options.map((option) => (
//                       <div
//                         key={option.id}
//                         className="flex items-center gap-2 py-4 px-4 lg:px-6 border-t border-slate-200 last:border-b"
//                       >
//                         <RadioGroupItem value={option.value} id={option.id} />
//                         <Label htmlFor={option.id}>{option.text}</Label>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                   {error && (
//                     <span className="text-sm text-red-500 block m-2">
//                       {error.message}
//                     </span>
//                   )}
//                 </>
//               )}
//             />
//           )}

//           {/* Multiple Select */}
//           {currentQuestion.type === "multiple" && (
//             <Controller
//               name={`answers.${currentQuestion.id}`}
//               control={control}
//               rules={{
//                 validate: (value) =>
//                   value?.length > 0 || "Please select at least one option",
//               }}
//               render={({ field, fieldState: { error } }) => {
//                 const handleCheckboxChange = (checked, value) => {
//                   const current = field.value || [];
//                   if (checked === true) {
//                     field.onChange([...current, value]);
//                   } else if (checked === false) {
//                     field.onChange(current.filter((v) => v !== value));
//                   }
//                 };

//                 return (
//                   <>
//                     {currentQuestion.options.map((option) => (
//                       <div
//                         key={option.id}
//                         className="flex items-center gap-2 py-4 px-4 lg:px-6 border-t border-slate-200 last:border-b"
//                       >
//                         <Checkbox
//                           id={option.id}
//                           checked={field.value?.includes(option.value)}
//                           onCheckedChange={(checked) =>
//                             handleCheckboxChange(checked, option.value)
//                           }
//                         />
//                         <Label htmlFor={option.id}>{option.text}</Label>
//                       </div>
//                     ))}
//                     {error && (
//                       <span className="text-sm text-red-500 block m-2">
//                         {error.message}
//                       </span>
//                     )}
//                   </>
//                 );
//               }}
//             />
//           )}

//           {/* Match Type */}
//           {currentQuestion.type === "match" &&
//             currentQuestion.options.map((option) => (
//               <Controller
//                 key={option.id}
//                 name={`answers.${currentQuestion.id}.${option.id}`}
//                 control={control}
//                 rules={{ required: "Please select a match" }}
//                 render={({ field, fieldState: { error } }) => (
//                   <div className="py-4 px-4 lg:px-6 border-t border-slate-200 flex flex-col last:border-b">
//                     <div className="flex justify-between items-center">
//                       <p className="text-slate-700 text-base font-medium">
//                         {option.text}
//                       </p>
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <SelectTrigger className="w-[180px]">
//                           <SelectValue placeholder="Select matching" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectGroup>
//                             {option.ansOptions.map((ansOption) => (
//                               <SelectItem
//                                 key={ansOption.id}
//                                 value={ansOption.value}
//                               >
//                                 {ansOption.text}
//                               </SelectItem>
//                             ))}
//                           </SelectGroup>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     {error && (
//                       <span className="text-sm text-red-500 block mt-2">
//                         {error.message}
//                       </span>
//                     )}
//                   </div>
//                 )}
//               />
//             ))}
//         </div>

//         {/* Navigation buttons */}
//         <div className="flex justify-between px-4 lg:px-6">
//           <Button
//             type="button"
//             onClick={handlePrevious}
//             disabled={currentIndex === 0}
//             variant="outline"
//           >
//             <ChevronLeft className="size-5" />
//             Previous
//           </Button>

//           {currentIndex < quizResponse.questions.length - 1 ? (
//             <Button type="button" variant="secondary" onClick={handleNext}>
//               Next
//               <ChevronRight className="size-5" />
//             </Button>
//           ) : (
//             <Button type="submit" variant="secondary">
//               Submit Quiz
//             </Button>
//           )}
//         </div>
//       </form>
//       <QuizResult open={showResult} setOpen={setShowResult} />
//     </section>
//   );
// }

"use client";

import {
  ChevronLeft,
  ChevronRight,
  QuestionCircle,
  Timer,
} from "@/components/icons";
import { QuizResult } from "@/components/partials";
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
import { formatSecondsToReadableTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

type Option = {
  id: string;
  text: string;
  value: string;
};

type AnswerOption = {
  id: string;
  text: string;
  value: string;
};

type MatchOption = {
  id: string;
  text: string;
  ansOptions: AnswerOption[];
};

type Question = {
  id: string;
  text: string;
  type: "single" | "multiple" | "truefalse" | "match";
  options: Option[] | MatchOption[];
};


type QuizResponse = {
  id: string;
  timeLimit: number;
  questions: Question[];
};

type FormValues = {
  answers: {
    [key: string]: string | string[] | { [key: string]: string };
  };
};

const quizResponse: QuizResponse = {
  id: "1",
  timeLimit: 60,
  questions: [
    {
      id: "1",
      text: "What is the capital of France?",
      type: "single",
      options: [
        { id: "1-1", text: "London", value: "London" },
        { id: "1-2", text: "Paris", value: "Paris" },
        { id: "1-3", text: "Berlin", value: "Berlin" },
        { id: "1-4", text: "Madrid", value: "Madrid" },
      ],
    },
    {
      id: "2",
      text: "Which of these are programming languages?",
      type: "multiple",
      options: [
        { id: "2-1", text: "HTML", value: "HTML" },
        { id: "2-2", text: "JavaScript", value: "JavaScript" },
        { id: "2-3", text: "CSS", value: "CSS" },
        { id: "2-4", text: "Python", value: "Python" },
      ],
    },
    {
      id: "3",
      text: "React is a JavaScript library for building user interfaces.",
      type: "truefalse",
      options: [
        { id: "3-1", text: "True", value: "true" },
        { id: "3-2", text: "False", value: "false" },
      ],
    },
    {
      id: "4",
      text: "Match the following",
      type: "match",
      options: [
        {
          id: "4-1",
          text: "Mount Everest is the tallest mountain on Earth. What country is it located in?",
          ansOptions: [
            { id: "4-1-1", text: "Nepal", value: "nepal" },
            { id: "4-1-2", text: "China", value: "china" },
          ],
        },
        {
          id: "4-2",
          text: "The Amazon Rainforest is often called the Earth's lungs. What continent is it in?",
          ansOptions: [
            { id: "4-2-1", text: "South America", value: "southAmerica" },
            { id: "4-2-2", text: "North America", value: "northAmerica" },
          ],
        },
      ],
    },
  ],
};


export default function StartQuiz() {
  const [showResult, setShowResult] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionTimer, setQuestionTimer] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      answers: {},
    },
    mode: "onChange",
  });

  console.log({ errors });
  const currentQuestion = quizResponse.questions[currentIndex];

  const onSubmit = (data: FormValues) => {
    console.log("Submitted Answers:", data.answers);
    setShowResult(true);
  };

  const handleNext = async () => {
    const isValid = await trigger(`answers.${currentQuestion.id}`);

    if (!isValid) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (quizResponse.timeLimit) {
      setQuestionTimer(quizResponse.timeLimit);
      const interval = setInterval(() => {
        setQuestionTimer((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmit(onSubmit)();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [handleSubmit]);

  return (
    <section className="bg-slate-50 flex flex-col gap-4 lg:gap-6 pb-4 lg:pb-6">
      <div className="p-4 lg:p-6 bg-slate-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg lg:text-2xl capitalize text-primary">
          My Course
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-3 px-4 lg:px-6">
          <div className="flex gap-2 text-slate-600 items-center">
            <QuestionCircle className="size-5" />
            <h3 className="text-lg font-semibold">
              Question {currentIndex + 1}/{quizResponse.questions.length}
            </h3>
          </div>
          {questionTimer !== null && (
            <div className="flex gap-2 text-blue-500">
              <Timer className="size-5" />
              Time left {formatSecondsToReadableTime(questionTimer)}
            </div>
          )}
        </div>

        <p className="text-lg text-primary font-semibold mb-4 px-4 lg:px-6">
          {currentQuestion.text}
        </p>

        <div className="mb-6">
          {/* Single or True/False */}
          {/* Single or True/False */}
          {(currentQuestion.type === "single" || currentQuestion.type === "truefalse") && (
            <Controller
              name={`answers.${currentQuestion.id}`}
              control={control}
              rules={{ required: "Please select an option" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value as string}  // Explicit type assertion
                    className="gap-0"
                  >
                    {(currentQuestion.options as Option[]).map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-2 py-4 px-4 lg:px-6 border-t border-slate-200 last:border-b"
                      >
                        <RadioGroupItem value={option.value} id={option.id} />
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
          {currentQuestion.type === "multiple" && (
            <Controller
              name={`answers.${currentQuestion.id}`}
              control={control}
              rules={{
                validate: (value) =>
                  (value as string[])?.length > 0 || "Please select at least one option",
              }}
              render={({ field, fieldState: { error } }) => {
                const handleCheckboxChange = (checked: boolean, value: string) => {
                  const current = (field.value as string[]) || [];
                  if (checked) {
                    field.onChange([...current, value]);
                  } else {
                    field.onChange(current.filter((v) => v !== value));
                  }
                };

                return (
                  <>
                    {(currentQuestion.options as Option[]).map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-2 py-4 px-4 lg:px-6 border-t border-slate-200 last:border-b"
                      >
                        <Checkbox
                          id={option.id}
                          checked={(field.value as string[])?.includes(option.value)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(checked as boolean, option.value)
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
          {currentQuestion.type === "match" &&
            (currentQuestion.options as MatchOption[]).map((option) => (
              <Controller
                key={option.id}
                name={`answers.${currentQuestion.id}.${option.id}`}
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
                        value={field.value as string}  // Explicit type assertion
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select matching" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {option.ansOptions.map((ansOption) => (
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
        <div className="flex justify-between px-4 lg:px-6">
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
          >
            <ChevronLeft className="size-5" />
            Previous
          </Button>

          {currentIndex < quizResponse.questions.length - 1 ? (
            <Button type="button" variant="secondary" onClick={handleNext}>
              Next
              <ChevronRight className="size-5" />
            </Button>
          ) : (
            <Button type="submit" variant="secondary">
              Submit Quiz
            </Button>
          )}
        </div>
      </form>
      <QuizResult open={showResult} setOpen={setShowResult} />
    </section>
  );
}
