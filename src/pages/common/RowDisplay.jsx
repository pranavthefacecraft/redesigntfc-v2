const Image = ({ path, classes }) => {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl h-100 lg:h-[570px] xl:h-[620px] 2xl:h-[820px] ${classes}`}
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
    <div className="flex w-full flex-col items-start p-0 gap-8 lg:flex-row lg:gap-16 xl:gap-16 lg:h-[570px] xl:h-[620px] 2xl:h-[820px]">
      <Image path={image1} classes={classes} />

      <Image path={image2} classes={classes} />
    </div>
  );
};
export default RowDisplay;
