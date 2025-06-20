import { MagnifyingGlass } from "@/components/icons";

const CourseNotFound = () => {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-144px)] lg:min-h-[calc(100vh-184px)] text-center px-4">
      <div className="max-w-md mx-auto space-y-4">
        <MagnifyingGlass className="mx-auto h-12 w-12 text-gray-400" />
        <h2 className="text-2xl font-bold text-gray-800">Course Not Found</h2>
        <p className="text-gray-400">
          We couldn&apos;t find the course you&apos;re looking for. It may have
          been removed or you might have followed a broken link.
        </p>
      </div>
    </div>
  );
};

export default CourseNotFound;
