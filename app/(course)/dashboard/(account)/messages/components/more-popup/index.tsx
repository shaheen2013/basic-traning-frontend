import { Comment, Delete, MoreVertical } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MorePopOver = () => {
  return (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <div className="cursor-pointer size-6 lg:size-8 flex items-center justify-center">
          <MoreVertical className="size-5 lg:size-6 text-primary" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-56 shadow-lg rounded-lg p-4 lg:p-4"
        align="end"
      >
        <ul className="flex flex-col">
          <li className="cursor-pointer text-sm font-medium text-slate-700 p-2.5 group hover:bg-blue-600 hover:text-white rounded-md transition-colors duration-200">
            <div className="flex items-center gap-2">
              <Comment className="size-5 text-slate-700 group-hover:text-white transition-colors duration-200" />
              Turn Off Commenting
            </div>
          </li>
          <li className="cursor-pointer text-sm font-medium text-slate-700 p-2.5 group hover:text-red-500 hover:bg-red-100 rounded-md transition-colors duration-200">
            <div className="flex items-center gap-2">
              <Delete className="size-5 text-slate-700 group-hover:text-red-500 transition-colors duration-200" />
              Delete
            </div>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MorePopOver;
