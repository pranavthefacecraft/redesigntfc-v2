import './Launch.css';

import Main from './3D/Main';

export default function ComingSoon() {


    return (
        <>
           
            <div className="page-wrapper fixed w-full h-screen bg-slate-400 top-0 left-0 z-0">

                <div className="canvas-wrapper border-4 max-w-[1920px] h-full z-10 mx-auto">
                    <Main />
                </div>

            </div>
        </>
    );
}