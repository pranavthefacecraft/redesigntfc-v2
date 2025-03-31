const DisplayVideo = ({ children }) => {
  return (
    <div className="mt-5 relative flex h-102 w-full items-center justify-center overflow-hidden rounded-2xl shadow-xs lg:h-[540px] xl:h-[820px] ">
      {children}
    </div>
  );
};
export default DisplayVideo;