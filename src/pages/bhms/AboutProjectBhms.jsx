import Section from "../common/Section.jsx";

const AboutProject = () => {
  return (
    <div className="relative flex w-full flex-col gap-y-8 lg:items-center lg:gap-y-24 xl:gap-y-36">
      <h2 className="text-customred text-lg font-medium lg:absolute lg:left-0 lg:w-32 lg:text-xl">
        About the Projects
      </h2>

      <div className="flex flex-col gap-y-8 lg:w-[55%] lg:gap-y-16">
        <Section
          title="Challenge"
          text="We promoted Solit Hub's location in the quieter subur ob Littau, Luzern through creative visuals, engaging the young demographic, and showcasting Littau as part of Luzern to enhance brand awareness in a competitive co-working space market."
        />

        <Section
          title="Results"
          text="We improved the brand's digital presence through an integrated approach, including targeted social media campaigns and engaging video content. This resonated well with young, creative businesses, resulting in positive client feedback. The project demonstrates the impact of a well-crafted digital strategy on a brand's image and market position."
        />
      </div>
    </div>
  );
};

export default AboutProject;
