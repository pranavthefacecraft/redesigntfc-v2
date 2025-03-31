const classes = {
  sm: "text-sm",
  md: "font-secondary font-light text-[#3F3F3F] text-[18px] leading-[27px]",
  lg: "text-2xl lg:text-5xl xl:text-5xl xl:leading-20",
  color: {
    white: "text-white",
    black: "text-black",
    red: "text-red-500",
    // Add more colors as needed
  },
};

const Text = ({ content, size = "md", color = "black" }) => {
  return <p className={`font-secondary ${classes[size]} ${classes.color[color]}`}>{content}</p>;
};

export default Text;
