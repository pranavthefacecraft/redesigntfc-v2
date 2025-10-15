import './tfclaunch.css';
import { PlayProvider } from './Contexts/Play';
import Main from './Main';
import MouseScrollCursor from './Mousecursor';

export default function Test() {
    return (
        <PlayProvider>
         <div className="mainpage fixed inset-0 overflow-hidden"> 
           <Main />
           <MouseScrollCursor/>
         </div>
        </PlayProvider>
    );
}

