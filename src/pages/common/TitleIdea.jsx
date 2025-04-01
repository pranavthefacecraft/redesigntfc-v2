const styles = {
  sm: "Futura-PT-Demi text-xl",
  md: "Futura-PT-Demi text-[80px] leading-none lg:text-[40px] xl:text-[40px] 2xl:text-[80px]",
  lg: "Futura-PT-Demi text-2xl md:text-[50px] lg:text-[50px] xl:text-[50px] 2xl:text-[50px]",
};

const Titleidea = ({ content, size = "md", centered = false, color = "black" }) => {
  return (
    <h3 className={`${styles[size]} ${centered ? "text-center" : "text-left"}`} style={{ color }}>
      {content}
    </h3>
  );
};

export default Titleidea;
