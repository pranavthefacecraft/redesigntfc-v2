const 
Idea = () => {
  return (
    <div
      id="idea-grid"
      className="grid grid-rows-2 gap-4 h-full w-full solit-el-1"
      style={{ minHeight: "400px" }}
    >
      {/* First Row: Two images, 60% and 40% width */}
      <div className="grid grid-cols-5 gap-4 h-full">
        <div className="col-span-3 flex items-center justify-center">
        <video
            src="/assets/laughingtree/logo-animation.mp4"
            className="w-full h-full object-cover rounded"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className="col-span-2 flex items-center justify-center">
        <video
            src="/assets/laughingtree/Font.mp4"
            className="w-full h-full object-cover rounded"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
      {/* Second Row: Three equal squares */}
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="aspect-square bg-gray-200 flex items-center justify-center rounded">
        <video
            src="/assets/laughingtree/Colors.mp4"
            className="w-full h-full object-cover rounded"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className="aspect-square bg-gray-200 flex items-center justify-center rounded">
          <img src="/assets/laughingtree/tree-logo.png" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square bg-gray-200 flex items-center justify-center rounded">
          {/* Content for square 3 */}
        </div>
      </div>
    </div>
  );
};
export default Idea;
