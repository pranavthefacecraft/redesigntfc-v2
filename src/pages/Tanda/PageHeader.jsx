const PageHeader = () => {
  return (
    <h6 className="font-secondary z-50 flex w-full items-center gap-x-1 p-1 text-[14px] font-light sm:pb-28 sm:text-[14px] md:pb-0 md:text-[14px] lg:pb-10 lg:text-[14px] xl:pb-10 xl:text-[14px] 2xl:pb-28 2xl:text-[14px]">
      <a href="/" className="pointer-events-auto">
        Home
      </a>
      <div>&gt;</div>
      <a href="/" className="pointer-events-auto">
        Projects
      </a>
      <div>&gt;</div>
      <a href="/" className="pointer-events-auto">
        Tanda
      </a>
    </h6>
  );
};

export default PageHeader;
