import Modal from "..";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const QuizResult = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      open={open}
      onOpenChange={() => setOpen(false)}
      classes={{ dialogContent: "sm:max-w-[586px]" }}
    >
      <div className="flex flex-col">
        <Image
          src={"/assets/course/quiz-submit.svg"}
          alt="quiz-submit"
          width={1000}
          height={700}
          className="h-auto max-w-32 w-full object-contain object-center mx-auto mb-6"
        />
        <h3 className="text-primary textxl lg:text-3xl font-semibold text-center mb-4">
          Quiz Submitted Successfully!
        </h3>

        <div className="max-w-80 w-full grid grid-cols-2 gap-2 mx-auto">
          <p className="text-slate-600 text-base lg:text-xl">Point</p>
          <div className="text-slate-600 text-base lg:text-xl font-semibold">
            <span className="mx-4">:</span>2.5/11
          </div>
          <p className="text-slate-600 text-base lg:text-xl">Percentage</p>
          <div className="text-slate-600 text-base lg:text-xl font-semibold">
            <span className="mx-4">:</span>22.7%
          </div>
          <p className="text-slate-600 text-base lg:text-xl">Duration</p>
          <div className="text-slate-600 text-base lg:text-xl font-semibold">
            <span className="mx-4">:</span>00:22:55
          </div>
          <p className="text-slate-600 text-base lg:text-xl">Started Date</p>
          <div className="text-slate-600 text-base lg:text-xl font-semibold">
            <span className="mx-4">:</span>Thu 24 APR
          </div>
          <p className="text-slate-600 text-base lg:text-xl">End Date</p>
          <div className="text-slate-600 text-base lg:text-xl font-semibold">
            <span className="mx-4">:</span>Thu 24 APR
          </div>
        </div>

        <div className="mt-10 flex justify-between gap-4 w-full">
          <Button
            type="button"
            variant="outline"
            className="rounded-full w-1/2"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-full w-1/2"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default QuizResult;
