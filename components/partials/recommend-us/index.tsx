import TestimonialCard from "../testimonial";

const RecommendUs = () => {
  return (
    <section className="py-12 lg:py-32 bg-slate-50 flex justify-center flex-col gap-y-24">
      <div className="container">
        <h3 className="text-3xl lg:text-7xl font-semibold text-primary text-center">
          Our user{" "}
          <span className="font-normal font-vollkorn italic pr-4">
            Love To Recommend
          </span>
          Us
        </h3>
        <TestimonialCard />
      </div>
    </section>
  );
};

export default RecommendUs;
