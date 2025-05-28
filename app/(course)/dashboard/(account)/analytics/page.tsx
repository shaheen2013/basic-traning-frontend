import {
  CheckCircleMark,
  Fire,
  QuestionCircle,
  TableChecker,
  Tap,
} from "@/components/icons";

export default function Analytics() {
  return (
    <div className="bg-slate-50 rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-slate-200 rounded-t-2xl">
        Analytics
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div className="rounded-2xl bg-white border border-slate-200 flex flex-col gap-4 p-6">
          <h3 className="text-primary text-2xl font-semibold">Mark</h3>
          <div className="flex flex-col gap-2">
            <div className="px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex justify-between items-center">
              <h4 className="text-primary text-base font-normal">Quiz Marks</h4>
              <div className="flex items-center gap-2">
                <Tap className="text-slate-800 size-5" />
                <p className="text-slate-800 font-medium">67%</p>
              </div>
            </div>
            <div className="px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex justify-between items-center">
              <h4 className="text-primary text-base font-normal">
                Assignment Marks
              </h4>
              <div className="flex items-center gap-2">
                <Tap className="text-slate-800 size-5" />
                <p className="text-slate-800 font-medium">55%</p>
              </div>
            </div>
            <div className="px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex justify-between items-center">
              <h4 className="text-primary text-base font-normal">
                Total Marks
              </h4>
              <div className="flex items-center gap-2">
                <Fire className="text-slate-800 size-5" />
                <p className="text-slate-800 font-medium">77%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 flex flex-col gap-4 p-6">
          <h3 className="text-primary text-2xl font-semibold">Assignment</h3>
          <div className="flex flex-col gap-2">
            <div className="px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex justify-between items-center">
              <h4 className="text-primary text-base font-normal">
                Complete Assignment
              </h4>
              <div className="flex items-center gap-2">
                <CheckCircleMark className="text-slate-800 size-5" />
                <p className="text-slate-800 font-medium">15</p>
              </div>
            </div>
            <div className="px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex justify-between items-center">
              <h4 className="text-primary text-base font-normal">
                Incomplete Assignment
              </h4>
              <div className="flex items-center gap-2">
                <TableChecker className="text-slate-800 size-5" />
                <p className="text-slate-800 font-medium">05</p>
              </div>
            </div>
            <div className="px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex justify-between items-center">
              <h4 className="text-primary text-base font-normal">
                Total Assignment
              </h4>
              <div className="flex items-center gap-2">
                <QuestionCircle className="text-slate-800 size-5" />
                <p className="text-slate-800 font-medium">20</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 flex flex-col gap-4 p-6">
          <h3 className="text-primary text-2xl font-semibold">Quiz</h3>
          <div className="flex flex-col gap-2">
            <div className="px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex justify-between items-center">
              <h4 className="text-primary text-base font-normal">
                Complete Quiz
              </h4>
              <div className="flex items-center gap-2">
                <CheckCircleMark className="text-slate-800 size-5" />
                <p className="text-slate-800 font-medium">15</p>
              </div>
            </div>
            <div className="px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex justify-between items-center">
              <h4 className="text-primary text-base font-normal">
                Incomplete Quiz
              </h4>
              <div className="flex items-center gap-2">
                <TableChecker className="text-slate-800 size-5" />
                <p className="text-slate-800 font-medium">05</p>
              </div>
            </div>
            <div className="px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex justify-between items-center">
              <h4 className="text-primary text-base font-normal">Total Quiz</h4>
              <div className="flex items-center gap-2">
                <QuestionCircle className="text-slate-800 size-5" />
                <p className="text-slate-800 font-medium">20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
