import './home.css'
import { Suspense } from 'react';
import Menu from '../../components/Menu/menu'
import Cards from '../../components/Menu/MenuCanvas/cards'
import Logo from '../../../../../Structure/src/components/Menu/Logo';

const Home = () => {
  return (
    <div className='homewrapper h-screen w-screen overflow-hidden'>

      <Suspense fallback={null}>
      <Menu />
      </Suspense>

      <Suspense fallback={null}>
      <Cards />
      </Suspense>

      <Logo/>

    </div>
  );
};

export default Home;