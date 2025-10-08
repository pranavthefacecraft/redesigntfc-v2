import './Launch.css'

import Scene from './Components/Scene';


function Page() {
  return (
    <>
      <div className="page-wrapper fixed w-full h-screen top-0 left-0 overflow-hidden">
        <Scene />
        <div className="overlay fixed w-full max-w-[1536px] h-screen z-10 left-1/2 transform -translate-x-1/2">
        </div>
      </div>
    </>
  );
}
export default Page;
  
