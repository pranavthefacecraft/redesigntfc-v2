import Title from "./Title.jsx";
import Text from "./Text.jsx";

const Section = ({ className, title, text, textColor, expanded = true }) => {
  return (
    <div
      className={`flex flex-col gap-y-0 lg:w-[55%] lg:gap-y-0 ${expanded ? "lg:py-0" : "lg:py-0"}`}
    >
      <Title {...title} />

      <Text content={text} size="md" color={textColor} />
    </div>
  );
};

export default Section;
