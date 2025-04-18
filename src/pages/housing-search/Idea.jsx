const Idea = () => {
  return (
    <div
      id="idea-grid-housing-search"
      className="grid grid-cols-3 gap-4  w-full"
    >
      {/* First column: 2 images */}
      <div className="flex flex-col h-full gap-4">
        
        <video
              src="/assets/hosuing-search/Font.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-1/2 rounded"
              
            />
        <img
          src="/assets/hosuing-search/websiteonphone.png"
          className="object-cover w-full h-1/2 rounded"
        />
      </div>
      {/* Second column: 3 images */}
      <div className="flex flex-col h-full gap-4">
        <img
          src="/assets/hosuing-search/laptopwithweb.png"
          className="object-cover w-full h-1/3 rounded"
        />
        <img
          src="/assets/hosuing-search/housing-search-logo.png"
          className="object-cover w-full h-1/3 rounded"
        />
        <img
          src="/assets/hosuing-search/house-interior.png"
          className="object-cover w-full h-1/3 rounded"
        />
      </div>
      {/* Third column: 2 images */}
      <div className="flex flex-col h-full gap-4">
      <video
              src="/assets/hosuing-search/color.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-1/2 rounded"
              
            />
        <img
          src="/assets/hosuing-search/house-image.png"
          className="object-cover w-full h-1/2 rounded"
        />
      </div>
    </div>
  );
};

export default Idea;
