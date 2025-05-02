const Entry = ({ title, text }) => {
  return (
    <div className="flex flex-col lg:text-lg">
      <h5 className="text-customred Futura-PT-Medium mb-5 text-[18px] uppercase sm:text-[14px] md:text-[14px] lg:text-[20px] xl:text-[20px] 2xl:text-[20px]">
        {title}
      </h5>
      <p className="font-secondary min-w-24 text-white sm:text-[18px] md:text-[18px] lg:text-[18px] xl:text-[18px] 2xl:text-[18px]">
        {text}
      </p>
    </div>
  );
};

const ProjectTag = () => {
  return (
    <div className="pointer-events-none relative flex w-full flex-col sm:gap-y-0 md:gap-y-0 lg:gap-y-14 xl:gap-y-14 2xl:gap-y-24 xl:-mb-0">
      <h1 className="Futura-PT-Demi uppercase text-white text-[68px] sm:text-[68px] md:text-[68px] lg:text-8xl xl:text-[128px] 2xl:text-[128px] leading-[70px] sm:leading-[70px] md:leading-[70px] lg:leading-[90px] xl:leading-[115px] 2xl:leading-[115px] ">
      PHOTO VIDEO AND ANIMATION
      </h1>
      <h4 className="text-customred Futura-PT-Medium mb-15 text-[25px] sm:text-[20px] md:text-[20px] lg:text-[30px] xl:text-[30px] 2xl:text-[30px] block sm:block md:block lg:hidden xl:hidden 2xl:hidden">
      Education
        </h4>

      <div className="flex flex-col gap-y-0 lg:flex-row lg:items-end lg:justify-between mb-10 sm:mb-10 md:mb-0 lg:mb-0 xl:mb-10 2xl:mb-10">
        <div className="flex gap-x-10">
          <Entry title="Client" text="Multiple" />
          <Entry title="Service" text="Photography, Videography, Animation, Creativity" />
        </div>

        <h4 className="text-customred Futura-PT-Medium text-[20px] sm:text-[20px] md:text-[20px] lg:text-[30px] xl:text-[30px] 2xl:text-[30px] hidden sm:block md:hidden lg:block xl:block 2xl:block">
        Education
        </h4>
      </div>
    </div>
  );
};

export default ProjectTag;
