const Image = ({ path, classes }) => {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl h-100 xl:h-[820px] ${classes}`}
    >
      <img
        src={path}
        className="absolute top-0 left-0 w-full object-cover"
      />
    </div>
  );
};

const RowDisplay = ({ image1, image2, classes }) => {
  return (
    <div className="flex w-full flex-col items-start p-8 gap-8 lg:flex-row lg:gap-16 xl:gap-16 border-red-600 xl:h-[820px]">
      <Image path={image1} classes={classes} />

      <Image path={image2} classes={classes} />
    </div>
  );
};
export default RowDisplay;
