const styles = {
  sm: "Futura-PT-Heavy uppercase text-xl",
  md: "Futura-PT-Heavy uppercase text-[50px] leading-none lg:text-[80px] xl:text-[120px] 2xl:text-[148px]",
  lg: "Futura-PT-Heavy uppercase text-2xl md:text-[50px] lg:text-[50px] xl:text-[50px] 2xl:text-[50px]",
};

const TitleMoreProjects = ({ content, size = "md", centered = false, color = "black" }) => {
  return (
    <h3 className={`${styles[size]} ${centered ? "text-center" : "text-left"}`} style={{ color }}>
      {content}
    </h3>
  );
};

export default TitleMoreProjects;
