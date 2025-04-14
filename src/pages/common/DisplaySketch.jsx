const Display = ({ children }) => {
    return (
      <div className="mt-0 mb-0 sm:mb-7 md:mb-7 lg:mb-7 xl:mb-7 2xl:mb-7 relative flex w-full items-center justify-center overflow-hidden rounded-2xl h-62 sm:h-102 md:h-102 lg:h-[520px] xl:h-[100vh] 2xl:h-[820px] ">
        {children}
      </div>
    );
  };
  export default Display;
  