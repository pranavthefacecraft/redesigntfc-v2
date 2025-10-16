import './tfclaunch.css';
import { PlayProvider } from './Contexts/Play';
import Main from './Main';
import MouseScrollCursor from './Mousecursor';

export default function TFCLaunch() {
    return (
        <PlayProvider>
        <div className="tfc-page fixed inset-0 overflow-hidden bg-black"> 
         <div className="mainpage fixed inset-0 overflow-hidden max-w-[1920px] max-h-[1920px] mx-auto my-auto"> 
           
           <Main />
           <MouseScrollCursor/>
         </div>
        </div> 
        {/* <div className="tfc-page fixed inset-0 overflow-hidden bg-black"> 
         <div className="mainpage fixed inset-0 overflow-hidden w-full h-full"> 
           <Main />
           <MouseScrollCursor/>
         </div>
        </div>  */}
        </PlayProvider>
    );
}

