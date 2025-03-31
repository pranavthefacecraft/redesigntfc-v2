const Image = ({ path, classes }) => {
  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-[4/5] xl:aspect-[4/5] ${classes}`}
    >
      <img
        src={path}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
    </div>
  );
};

const RowDisplay = ({ image1, image2, classes }) => {
  return (
    <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-16 xl:gap-16 border-red-600">
      <Image path={image1} classes={classes} />

      <Image path={image2} classes={classes} />
    </div>
  );
};
export default RowDisplay;
