// components/Quiz.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  QuestionCircle,
  Timer,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatSecondsToMinutesTime } from "@/lib/utils";

type Question = {
  id: string;
  text: string;
  type: "single" | "multiple" | "truefalse";
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  timeLimit?: number;
};

type QuizProps = {
  questions: Question[];
  onComplete?: (results: {
    score: number;
    total: number;
    answers: Record<string, string | string[]>;
  }) => void;
};

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string | string[]>
  >({});
  const [questionTimer, setQuestionTimer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const currentQuestion = questions[currentIndex];

  // Question timer
  useEffect(() => {
    if (currentQuestion.timeLimit) {
      setQuestionTimer(currentQuestion.timeLimit);
      const interval = setInterval(() => {
        setQuestionTimer((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(interval);
            handleNext();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setQuestionTimer(null);
    }
  }, [currentIndex]);

  const handleAnswerSelect = (optionId: string) => {
    if (isSubmitted) return;

    if (currentQuestion.type === "single") {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionId,
      }));
    } else if (currentQuestion.type === "multiple") {
      setSelectedAnswers((prev) => {
        const current = (prev[currentQuestion.id] as string[]) || [];
        return {
          ...prev,
          [currentQuestion.id]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      });
    } else if (currentQuestion.type === "truefalse") {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionId,
      }));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    setIsSubmitted(true);

    // Calculate score
    let score = 0;
    questions.forEach((question) => {
      const selected = selectedAnswers[question.id];
      if (!selected) return;

      if (question.type === "single" || question.type === "truefalse") {
        const correctOption = question.options.find((opt) => opt.isCorrect);
        if (selected === correctOption?.id) {
          score += 1;
        }
      } else if (question.type === "multiple") {
        const selectedArr = selected as string[];
        const correctOptions = question.options
          .filter((opt) => opt.isCorrect)
          .map((opt) => opt.id);
        if (
          selectedArr.length === correctOptions.length &&
          selectedArr.every((opt) => correctOptions.includes(opt))
        ) {
          score += 1;
        }
      }
    });

    if (onComplete) {
      onComplete({
        score,
        total: questions.length,
        answers: selectedAnswers,
      });
    }
  };

  const isOptionSelected = (optionId: string) => {
    const selected = selectedAnswers[currentQuestion.id];
    if (!selected) return false;

    if (currentQuestion.type === "multiple") {
      return (selected as string[]).includes(optionId);
    } else {
      return selected === optionId;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-slate-600 items-center">
          <QuestionCircle className="size-5" />
          <h3 className="text-lg font-semibold">
            Question {currentIndex + 1}/{questions.length}
          </h3>
        </div>
        {questionTimer !== null && (
          <div className="flex gap-2 text-blue-500">
            <Timer className="size-5" />
            Time left {formatSecondsToMinutesTime(questionTimer)}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-lg text-primary font-semibold">
          {currentQuestion.text}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {currentQuestion.options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleAnswerSelect(option.id)}
            className="p-3 border-y border-slate-200 cursor-pointer transition-colors duration-200 hover:bg-slate-100"
          >
            {currentQuestion.type === "multiple" ? (
              <div className="flex items-center">
                <Checkbox
                  checked={isOptionSelected(option.id)}
                  className="mr-2"
                  name={`question-${currentQuestion.id}`}
                />
                {option.text}
              </div>
            ) : (
              <RadioGroup>
                <div className="flex items-center gap-3 cursor-pointer">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id}>{option.text}</Label>
                </div>
              </RadioGroup>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <ChevronLeft className="size-5" />
          Previous
        </Button>

        {currentIndex < questions.length - 1 ? (
          <Button variant={"secondary"} onClick={handleNext}>
            Next
            <ChevronRight className="size-5" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="secondary"
            disabled={isSubmitted}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Submit Quiz
          </Button>
        )}
      </div>

      {isSubmitted && onComplete && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Quiz submitted successfully!</h3>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Return Home
          </button>
        </div>
      )}
    </div>
  );
}
