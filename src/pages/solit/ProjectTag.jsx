const Entry = ({ title, text }) => {
  return (
    <div className="flex flex-col lg:text-lg">
      <h6 className="text-customred font-futura-PT-Light mb-0 text-[14px] font-light uppercase sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[14px] 2xl:text-[14px]">
        {title}
      </h6>
      <h5 className="font-secondary min-w-24 text-white sm:text-[20px] md:text-[20px] lg:text-[20px] xl:text-[20px] 2xl:text-[20px]">
        {text}
      </h5>
    </div>
  );
};

const ProjectTag = () => {
  return (
    <div className="lg:gap-y-1s pointer-events-none relative flex w-full flex-col sm:gap-y-24 md:gap-y-0 xl:-mb-20 xl:gap-y-14 2xl:gap-y-24 ">
      <h1 className="text-white text-[68px] md:text-[128px] lg:text-8xl xl:text-[128px] 2xl:text-[128px]">
        Solit
      </h1>

      <div className="flex flex-col gap-y-0 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex gap-x-10">
          <Entry title="Client" text="Solit Hub" />
          <Entry title="Service" text="Branding, Social Media, Videography" />
        </div>

        <h4 className="text-customred Futura-PT-Book sm:text-[30px] md:text-[30px] lg:text-[30px] xl:text-[30px] 2xl:text-[30px]">
          Coworking Space
        </h4>
      </div>
    </div>
  );
};

export default ProjectTag;
