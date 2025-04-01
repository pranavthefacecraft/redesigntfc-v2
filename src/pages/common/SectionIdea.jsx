import Titleidea from "./TitleIdea.jsx";
import Textidea from "./TextIdea.jsx";

const Sectionidea = ({ className, title, text, textColor, expanded = true }) => {
  return (
    <div
      className={`flex flex-col gap-y-4 lg:w-[55%] lg:gap-y-6 ${expanded ? "lg:py-0" : "lg:py-0"}`}
    >
      <Titleidea {...title} />

      <Textidea content={text} size="md" color={textColor} />
    </div>
  );
};

export default Sectionidea;
