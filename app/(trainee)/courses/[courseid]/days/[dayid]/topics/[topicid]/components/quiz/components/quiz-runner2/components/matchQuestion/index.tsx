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
      <h4 className="text-slate-700 text-base font-medium">{question.title}</h4>
      <Controller
        name={`answers.${question.id}`}
        control={control}
        rules={{ required: "Please select a match" }}
        render={({ field, fieldState: { error } }) => {
          const selectedOption = question.options.find(
            (opt: any) => opt.id.toString() === field.value?.toString()
          );

          return (
            <>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select match">
                    {selectedOption?.value || "Select match"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {question.options.map((option: any) => (
                      <SelectItem key={option.id} value={option.id.toString()}>
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
);

export default MatchQuestionItem;
