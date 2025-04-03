import React from 'react';
//import './BackgroundImageWithVideos.css';

const BackgroundImageWithVideos = ({ tabBackgroundImage, tabVideos }) => {
  return (
    <div className="background-image-with-videos" style={{ BackgroundImage: 'url(${tabBackgroundImage})' }}>
      {tabVideos.map((video, index) => (
        <video key={index} src={video} autoPlay muted loop className="video-element" />
      ))}
    </div>
  );
};

export default BackgroundImageWithVideos;