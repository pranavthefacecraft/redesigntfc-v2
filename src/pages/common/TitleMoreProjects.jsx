const styles = {
  sm: "Futura-PT-Heavy uppercase text-xl",
  md: "Futura-PT-Heavy uppercase text-[40px] leading-none lg:text-[60px] xl:text-[120px] 2xl:text-[148px]",
  lg: "Futura-PT-Heavy uppercase text-2xl md:text-[50px] lg:text-[50px] xl:text-[50px] 2xl:text-[50px]",
};

const TitleMoreProjects = ({ content, size = "md", centered = false, color = "black" }) => {
  return (
    <h3 className={`${styles[size]} ${centered ? "text-center" : "text-left"}`} style={{ color }}>
      {content}
      <img src="/assets/solit/arrow-down.gif" className="inline-block w-15 sm:w-20 md:w-50 lg:w-50 xl:w-50 2xl:w-50 h-15 sm:h-20 md:h-50 lg:h-50 xl:h-50 2xl:h-50" />
    </h3>
  );
};

export default TitleMoreProjects;
