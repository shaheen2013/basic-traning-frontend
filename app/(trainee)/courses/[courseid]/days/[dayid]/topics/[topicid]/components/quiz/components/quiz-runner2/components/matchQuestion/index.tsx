/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const MatchQuestionItem = ({
  question,
  control,
}: {
  question: any;
  control: any;
}) => (
  <div className="py-4 px-4 lg:px-6 border-t border-slate-200 flex flex-col last:border-b">
    <div className="flex justify-between items-center gap-4">
      <Controller
        name={`matching_answers.${question.id}`}
        control={control}
        render={({ field }) => {
          const selectedOption = question.options.find(
            (opt: any) => opt.id.toString() === field.value?.toString()
          );

          return (
            <div className="flex flex-col w-full">
              <div className="flex flex-col lg:flex-row justify-between w-full lg:items-center gap-4">
                <h4 className="text-slate-700 text-base font-medium">
                  {question.title}
                </h4>
                <Select onValueChange={field.onChange} value={field.value}>
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
              </div>
            </div>
          );
        }}
      />
    </div>
  </div>
);

export default MatchQuestionItem;
