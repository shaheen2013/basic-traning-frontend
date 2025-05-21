import Header from "../header";

const Hero = () => {
  return (
    <div
      className="w-full h-dvh"
      style={{
        background: `linear-gradient(0deg, rgba(5, 6, 33, 0.50) 0%, rgba(5, 6, 33, 0.50) 100%), url(${"/assets/landing-page/background-image.png"}) lightgray 50% / cover no-repeat`,
      }}
    >
      <Header className="py-8" />
      <div className="max-w-[1696px] mx-auto flex items-end pb-40 h-[calc(100dvh-120px)]">
        <div className="flex flex-col gap-6 max-w-5xl">
          <p className="text-3xl font-medium text-50">
            Start training for $549
          </p>
          <h2 className="text-white font-semibold text-8xl">
            Transform Learning with Basic Training
          </h2>
          <p className="text-4xl text-50">
            A powerful training tool that takes the guesswork out of new team
            member development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
