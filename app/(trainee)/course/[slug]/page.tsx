import Image from "next/image";

const Course = () => {
  return (
    <Image
      src={`/assets/course-info/course-cover.png`}
      alt="course-cover"
      width={1000}
      height={700}
      className="w-full h-full object-cover object-center rounded-xl"
    />
  );
};

export default Course;
