import './home.css'
import { Suspense } from 'react';
import Menu from '../common/Menu/menu'
import Cards from '../common/Menu/MenuCanvas/cards'

const Home = () => {
  return (
    <div className='homewrapper h-screen w-screen overflow-hidden'>

      <Suspense fallback={null}>
      <Menu />
      </Suspense>

      <Suspense fallback={null}>
      <Cards />
      </Suspense>

    </div>
  );
};

export default Home;