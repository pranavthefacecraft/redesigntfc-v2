import React from "react";
import { FaQuoteRight } from "react-icons/fa"; // Import the icon you want to use

const BackgroundImageWithIconText = ({
  imageUrl,
  icon: Icon,
  text,
  secondImageUrl,
  iconImageUrl,
}) => {
  return (
    <div
      className="relative w-full bg-cover bg-center h-fit"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="container mx-auto overflow-hidden pt-18">
        <div className="flex flex-row h-full items-center">
          <div className="basis-1/2 flex flex-col items-start justify-center">
            {iconImageUrl ? (
              <img src={iconImageUrl} alt="Icon" className="mb-4 w-16 sm:w-56 md:w-56 lg:w-56 xl:w-56 2xl:w-56" />
            ) : (
              <Icon className="mb-4 text-6xl" />
            )}
            <blockquote className="text-[18px] sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-secondary text-white min-w-36 border leading-10 sm:leading-10 md:leading-18 lg:leading-18 xl:leading-18 2xl:leading-18 ">{text}</blockquote>
          </div>
          <div className="basis-1/2">
            {secondImageUrl && (
              <img
                src={secondImageUrl}
                className="right-0 bottom-0 object-cover"
                alt="Second"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImageWithIconText;
