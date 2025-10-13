import './launch.css';
import { useEffect, useRef, useCallback } from 'react';
import useStore from './zustand/store';
import Lenis from 'lenis';

import Main from './3D/Main';
import Overlay from './UI/Overlay';
import MouseScrollCursor from './Cursor';

export default function ComingSoon() {
    const lenisRef = useRef();
    const rafIdRef = useRef();
    const { play, end} = useStore();

    // Memoized scroll handler to prevent unnecessary re-renders
    const handleBeforeUnload = useCallback(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.onbeforeunload = handleBeforeUnload;
        return () => {
            window.onbeforeunload = null;
        };
    }, [handleBeforeUnload]);

    // Optimized Lenis initialization with stable reference
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smooth: true,
            smoothWheel: true,
            syncTouch: true,
        });

        lenisRef.current = lenis;

        const raf = (time) => {
            lenis.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
        };

        rafIdRef.current = requestAnimationFrame(raf);

        return () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []); // Empty dependency array since Lenis doesn't depend on props/state

    // Optimized scroll control with proper cleanup
    useEffect(() => {
        const lenis = lenisRef.current;
        if (!lenis) return;

        let timeoutId;

        if (play && !end) {
            timeoutId = setTimeout(() => {
                lenis.start();
            }, 2500);
        } else {
            lenis.stop();
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [play, end]);

    // Memoized component structure to prevent unnecessary re-renders
    return (
        <div className="page relative min-h-screen">
            <MouseScrollCursor/>
            {/* Fixed canvas container */}
            <div className="canvas-container fixed inset-0 flex justify-center pointer-events-none">
                <div className="canvas-wrapper w-full max-w-[1920px] mx-auto h-screen">
                    <Main />
                </div>
            </div>

            {/* Fixed overlay container */}
            <div className="overlay-container fixed inset-0 flex justify-center z-20">
                <div className="overlay-wrapper w-full max-w-[1536px] h-screen mx-auto pointer-events-auto">
                    <Overlay />
                </div>
            </div>

            {/* Scrollable content */}
            <div className="scroll-space w-full">
                <div className="h-screen" />
                <div className="h-[50vh]" />
                <div className="h-screen" />
            </div>
        </div>
    );
}