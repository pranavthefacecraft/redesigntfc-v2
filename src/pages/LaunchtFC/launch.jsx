import './launch.css';

import Main from './3D/Main';

export default function ComingSoon() {


    return (
        <>
           
            <div className="page-wrapper absolute top-0 left-0 bottom-0 right-0 z-0 overflow-hidden">

                <div className="canvas-wrapper max-w-[1920px] h-full mx-auto z-10">
                    <Main />
                </div>

            </div>
        </>
    );
}