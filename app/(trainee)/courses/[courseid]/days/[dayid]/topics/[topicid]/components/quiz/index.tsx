/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Result from "./components/result";
import Instructions from "./components/instructions";
import QuizRunner from "./components/quiz-runner2";
import { useState } from "react";

const Quiz = ({ data }: { data?: any }) => {
  const [status, setStatus] = useState(data.status);

  const handleStatus = (status: string) => setStatus(status);
  return (
    <section className="bg-slate-50 flex flex-col gap-4 lg:gap-6 pb-4 lg:pb-6">
      <div className="p-4 lg:p-6 bg-slate-200">
        <h1 className="font-semibold text-lg lg:text-2xl capitalize text-primary">
          Quiz
        </h1>
      </div>
      {/* {status === "not_started" && (
        <Instructions data={data} handleStatus={handleStatus} />
      )}
      {status === "completed" && <Result />}
      {status === "ongoing" && <QuizRunner handleStatus={handleStatus} />} */}
      <QuizRunner handleStatus={handleStatus} />
    </section>
  );
};

export default Quiz;
