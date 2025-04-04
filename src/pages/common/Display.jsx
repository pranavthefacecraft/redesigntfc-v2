const Display = ({ children }) => {
  return (
    <div className="mt-0 mb-7 relative flex w-full items-center justify-center overflow-hidden rounded-2xl h-102 sm:h-102 md:h-102 lg:h-[540px] xl:h-[820px] ">
      {children}
    </div>
  );
};
export default Display;
