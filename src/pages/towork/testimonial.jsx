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
              <img src={iconImageUrl} alt="Icon" className="mb-4 w-56" />
            ) : (
              <Icon className="mb-4 text-6xl" />
            )}
            <blockquote className="text-5xl leading-18 font-secondary text-white min-w-36">{text}</blockquote>
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
