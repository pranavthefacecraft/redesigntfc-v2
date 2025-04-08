const PageHeader = () => {
  return (
    <h6 className="Futura-PT-Book z-50 flex w-full items-center gap-x-1 p-1 xl:pt-12 2xl:pt-32 sm:pb-28 md:pb-0 lg:pb-10 xl:pb-0 2xl:pb-0 sm:text-[24px] md:text-[24px] lg:text-[18px] xl:text-[18px] 2xl:text-[18px]">
      <a href="/" className="pointer-events-auto">
        Home
      </a>
      <div>&gt;</div>
      <a href="/" className="pointer-events-auto">
        Projects
      </a>
      <div>&gt;</div>
      <a href="/" className="pointer-events-auto">
      Solit
      </a>
    </h6>
  );
};

export default PageHeader;
