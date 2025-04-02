

const Slide = ({ image }) => {
  return (
    <div className="relative h-full w-full overflow-hidden border border-transparent lg:border-4 xl:border-6">
      <img
        src={image}
        className="h-full w-full rounded-2xl object-cover select-none lg:rounded-3xl"
      />
    </div>
  );
};

const Slider = () => {
  return (
    <div className="solit-el-1 absolute inset-0 flex items-center justify-center bg-black z-1000">
      <img
        src="/assets/rafw/3-Screens.png"
        className="pointer-events-none absolute bottom-0 left-0 h-full w-full object-cover select-none"
      />

    
    </div>
  );
};
export default Slider;
