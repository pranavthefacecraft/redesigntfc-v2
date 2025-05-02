const PageHeader = () => {
  return (
    <h6 className="Futura-PT-Book z-50 flex w-full items-center gap-x-1 p-1 pt-12 sm:pt-12 md:pt-12 lg:pt-12 xl:pt-12 2xl:pt-32 sm:pb-0 md:pb-0 lg:pb-10 xl:pb-0 2xl:pb-0 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[18px] 2xl:text-[18px]">
      <a href="/" className="pointer-events-auto">
        Home
      </a>
      <div>&gt;</div>
      <a href="/" className="pointer-events-auto">
        Projects
      </a>
      <div>&gt;</div>
      <a href="/" className="pointer-events-auto">
      Study English
      </a>
    </h6>
  );
};

export default PageHeader;
