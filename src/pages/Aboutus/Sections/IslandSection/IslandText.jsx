import React from 'react';

const IslandText = ({ island, index }) => {
  return (
    <div 
      id={`text-${index}`} 
      className='absolute left-4 sm:left-8 lg:left-16 top-1/2 transform -translate-y-1/2 z-30 px-4' 
      style={{ 
        opacity: 0,
        maxWidth: '90vw',
      }}
    >
      {/* Header */}
      <h3 className='monserrat-semibold text-sm sm:text-base lg:text-lg text-[#645EAD] font-medium mb-2 tracking-wide'>
        {island.header}
      </h3>
      
      {/* Main Title */}
      <h1 className='futura-light text-[28px] sm:text-[32px] md:text-[44px] lg:text-[52px] xl:text-[52px] 2xl:text-[70px] font-bold text-[#000000] mb-4 leading-tight'>
        {island.title.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < island.title.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </h1>
      

      
      {/* Description */}
      <p className='monserrat-medium text-sm sm:text-base lg:text-lg text-[#3F3F3F] leading-relaxed max-w-md lg:max-w-lg'>
        {island.description.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < island.description.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default IslandText;
