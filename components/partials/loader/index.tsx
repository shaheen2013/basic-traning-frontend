import { cn } from "@/lib/utils";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-144px)] lg:min-h-[calc(100vh-184px)]">
      <div
        className={cn(
          "animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500",
          className
        )}
      ></div>
    </div>
  );
};

export default Loader;
