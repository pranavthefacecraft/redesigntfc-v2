import { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';

import HomeCanvas from './Cards/Homecanvas';
import AgencyCanvas from './Cards/Agencycanvas';
import ServicesCanvas from './Cards/Servicescanvas';
import WorkCanvas from './Cards/Workcanvas';
import ContactCanvas from './Cards/Contactcanvas';


const Cards = () => {
  
  return (
  <AnimatePresence mode='wait'>

    <Suspense fallback={null}>

    <Suspense fallback={null}>
      <HomeCanvas/>
    </Suspense>  

    <Suspense fallback={null}>
      <AgencyCanvas/>
    </Suspense>  

    <Suspense fallback={null}>
      <ServicesCanvas/>
    </Suspense>  

    <Suspense fallback={null}>
      <WorkCanvas/>
    </Suspense> 

    <Suspense fallback={null}>
      <ContactCanvas/>
    </Suspense> 

    </Suspense>

  </AnimatePresence>    
  );
};

export default Cards;