import './home.css'
import { Suspense } from 'react';
import Menu from '../../components/Menu/menu'
import Cards from '../../components/Menu/MenuCanvas/cards'
import Logo from '../../components/Menu/Logo';

const Home = () => {

  // useEffect( () => {

  //   const lenis = new Lenis()
  //   function raf(time){

  //     lenis.raf(time)
  //     requestAnimationFrame(raf)

  //   }

  //   requestAnimationFrame(raf)

  // }, [])

  return (
    <div className="homewrapper h-screen w-screen select-none overflow-y-auto overflow-x-hidden">

      {/* Menu */}
      <Suspense fallback={null}>
        <Suspense fallback={null}>
          <Menu />
        </Suspense>
        <Suspense fallback={null}>
          <Cards />
        </Suspense>
          <Logo />
      </Suspense>
      



      <section className="one h-screen bg-transparent w-screen"></section>
      <section className="two h-screen bg-transparent w-screen"></section>
   

    </div>
  );
};

export default Home;