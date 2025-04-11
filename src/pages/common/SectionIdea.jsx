import Titleidea from "./TitleIdea.jsx";
import Textidea from "./TextIdea.jsx";

const Sectionidea = ({ className, title, text, textColor, expanded = true }) => {
  return (
    <div
      className={`flex flex-col p-0 sm:p-0 md:p-0 lg:p-0 xl:p-0 2xl:p-0 pb-[60px] sm:pb-0 md:pb-0 lg:pb-0 xl:pb-0 2xl:pb-0 gap-y-4 w-[100%] sm:w-[55%] md:w-[55%] lg:w-[55%] xl:w-[55%] 2xl:w-[55%] lg:gap-y-6 ${expanded ? "lg:py-0" : "lg:py-0"}`}
    >
      <Titleidea {...title} />

      <Textidea content={text} size="md" color={textColor} />
    </div>
  );
};

export default Sectionidea;
