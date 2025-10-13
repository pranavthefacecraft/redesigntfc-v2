import './Overlay.css';
import { memo, useCallback, useRef, useEffect } from "react";
import useStore from '../zustand/store';

const Overlay = memo(() => {
    const {
        end,
        play, setPlay,
        hasScroll,
        cardFlipped, setCardFlipped,
        cloudsColor, setCloudsColor,
        skyColor, setSkyColor,
        lightColor, setLightColor,
        rangevalue, setRangevalue,
        playSound, setPlaySound,
        resetAllValues
    } = useStore();

    // Sound logic
    const audioRef = useRef(null);

    // Play/pause/reset logic
    const handleSoundClick = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        audio.volume = 0.05;
        if (audio.paused || audio.currentTime === 0) {
            audio.currentTime = 0;
            audio.play().catch((err) => {
                console.error('Audio play error:', err);
            });
            setPlaySound(true);
        } else {
            audio.pause();
            audio.currentTime = 0;
            setPlaySound(false);
        }
    }, [setPlaySound]);

    // Autoplay when end is true and playSound is true
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        audio.volume = 0.05;
        if (end && playSound) {
            audio.currentTime = 0;
            audio.play().catch((err) => {
                console.error('Audio play error:', err);
            });
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [end, playSound]);

    useEffect(() => {
        const chatbotWidget = document.querySelector(".ai-chatbot-widget");
        if (chatbotWidget) {
            if (end) {
                chatbotWidget.classList.add("chatbot-visible");
                chatbotWidget.classList.remove("chatbot-hidden");
            } else {
                chatbotWidget.classList.add("chatbot-hidden");
                chatbotWidget.classList.remove("chatbot-visible");
            }
        }
    }, [end]);

    // Color change handlers
    const handleCloudsColorChange = useCallback((e) => {
        setCloudsColor(e.target.value);
    }, [setCloudsColor]);

    const handleLightColorChange = useCallback((e) => {
        setLightColor(e.target.value);
    }, [setLightColor]);

    const handleSkyColorChange = useCallback((e) => {
        setSkyColor(e.target.value);
    }, [setSkyColor]);

    // Ref for range value display
    const rangeValueRef = useRef(null);
    
    const rangeSlide = useCallback((value) => {
        if (rangeValueRef.current) {
            rangeValueRef.current.innerHTML = parseFloat(value).toFixed(2);
        }
        setRangevalue(parseFloat(value));
    }, [setRangevalue]);

    const handleRangeChange = useCallback((e) => {
        rangeSlide(e.target.value);
    }, [rangeSlide]);

    const handleReset = useCallback(() => {
        // Reset all values in store
        resetAllValues();
        // Update the range display
        if (rangeValueRef.current) {
            rangeValueRef.current.innerHTML = '0.10';
        }
    }, [resetAllValues]);

    return (
        <div className="overlay-wrapper w-full h-full select-none text-white">
            {/* Intro Section */}
            <div className={`intro-wrapper absolute inset-0 h-full w-full flex flex-col justify-center items-center z-0 ${hasScroll ? "intro-wrapper-disable" : ""}`}>
                <div className={`intro-logo w-[70%] top-[40vh] md:top-[30vh] absolute ${play ? "intro-logo-moveup" : ""} ${hasScroll ? "intro-logo-scroll-up" : ""}`}>
                    <img src="/Launch/images/Whitelogo.png" alt="Logo" className="aspect-auto object-contain" />
                </div>

                <button 
                    className={`intro-button bg-white text-black text-[11px] md:text-[13px] lg:text-[15px] px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2 rounded-full border-none inline-block relative overflow-hidden absolute top-20 sm:top-25 md:top-35 transform hover:text-white hover:bg-[#BF1736] hover:scale-105 transition-all duration-700 ease-in-out ${play ? "intro-button-disappear" : ""}`}
                    onClick={() => setPlay(true)}
                >
                    Begin
                </button>
            </div>

            {/* Outro Section */}
            <div className={`outro-wrapper absolute inset-0 w-full h-full perspective-[1500px] justify-center items-center pointer-cursor flex flex-col p-2 sm:p-0 ${end ? "outro-wrapper--appear" : ""}`}>
                <div className={`outro-content relative rounded-4xl h-[25%] sm:h-[35%] md:h-[40%] lg:h-[45%] xl:h-[50%] 2xl:h-[50%] aspect-[16/9] p-1 ${cardFlipped ? "outro-content--flipped" : ""}`}>
                    <div className={`liquidGlass-overlay absolute inset-0 w-full h-full rounded-4xl liquidGlass-effect ${end ? "liquidGlass-effect--active" : ""}`}/>

                    {/* Front Side */}
                    <div className="front-side absolute w-full h-full rounded-4xl flex flex-col justify-between p-8">
                        <div className="logo-wrapper basis-1/2 flex justify-center items-center p-4">
                            <img src="/Launch/images/Whitelogo.png" alt="Logo" className="aspect-auto" />
                        </div>

                        <div className="text-svg-wrapper basis-1/2 flex flex-col gap-2 sm:gap-0 justify-end items-center">
                            <div className="text whitespace-nowrap text-[10px] sm:text-[12px] md:text-[18px]">
                                Our new site's in the clouds for now. Launching soon!
                            </div>
                            <div className="svg-wrapper h-5 w-5 sm:h-10 sm:w-10 z-50" onClick={() => setCardFlipped(true)}>
                                <img 
                                    src="/Launch/images/arrow.svg" 
                                    alt="Arrow" 
                                    className="arrow-svg object-contain cursor-pointer"
                                />
                            </div> 
                        </div>
                    </div>

                    {/* Back Side */}
                    <div className="back-side absolute h-full w-full rounded-4xl flex flex-col justify-between p-1 sm:p-3 md:p-3 lg:p-4">
                        <div className="upper-wrapper basis-1/3 flex justify-center items-center">
                            <div className="display-text text-[8px] sm:text-[12px] md:text-[16px] leading-[14px] sm:leading-[24px] text-center pt-2 sm:pt-0">
                                Waiting doesn't have to be boring. Our interactive cloud background <br/> 
                                is all yours to explore while we prepare the full experience
                            </div>
                        </div>

                        <div className="middle-wrapper text-[8px] sm:text-[12px] md:text-[16px] basis-1/3 flex justify-between items-center px-3 sm:px-2">
                            <div className="cloudSpeed flex flex-col items-center justify-center gap-[8.6px]">
                                <p className="label">Cloud Speed</p>
                                <input 
                                    className="range" 
                                    type="range" 
                                    name="cloudRange" 
                                    min="0.00" 
                                    max="1.00"
                                    value={rangevalue}
                                    onChange={handleRangeChange} 
                                    step="0.01"
                                />
                                <span id="rangeValue" ref={rangeValueRef}>
                                    {rangevalue.toFixed(2)}
                                </span>
                            </div>

                            <div className="cloudColor flex flex-col items-center justify-center">
                                <p className="label">Cloud Color</p>
                                <div className="input-wrap">
                                    <input 
                                        type="color" 
                                        value={cloudsColor} 
                                        className="colorpicker" 
                                        onChange={handleCloudsColorChange}
                                    />
                                </div>
                            </div>

                            <div className="skyColor flex flex-col items-center justify-center">
                                <p className="label">Sky Color</p>
                                <div className="input-wrap">
                                    <input 
                                        type="color" 
                                        value={skyColor} 
                                        className="colorpicker" 
                                        onChange={handleSkyColorChange}
                                    />
                                </div>
                            </div>

                            <div className="lightColor flex flex-col items-center justify-center">
                                <p className="label">Light Color</p>
                                <div className="input-wrap">
                                    <input 
                                        type="color" 
                                        value={lightColor} 
                                        className="colorpicker" 
                                        onChange={handleLightColorChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="lower-wrapper basis-1/3 flex justify-between items-end">
                            <div className="sound-wrapper basis-1/3">
                                <img
                                    src="/Launch/images/sound.png"
                                    alt="Sound"
                                    className="arrow-svg h-5 w-5 sm:h-7 sm:w-7 mb-2 ml-3 sm:ml-2 cursor-pointer"
                                    onClick={handleSoundClick}
                                />
                                <audio ref={audioRef} src="/Launch/audio.mp3" preload="auto" />
                            </div>

                            <div className="svg-wrapper z-50 basis-1/3 flex justify-center" onClick={() => setCardFlipped(!cardFlipped)}>
                                <img 
                                    src="/Launch/images/arrow.svg" 
                                    alt="Arrow" 
                                    className="arrow-svg h-7 w-7 sm:h-10 sm:w-10 mb-1 sm:mb-0 cursor-pointer"
                                />
                            </div> 

                            <div className="reset-svg-wrapper z-50 basis-1/3 justify-end flex">
                                <img 
                                    src="/Launch/images/refresh.png" 
                                    alt="Reset" 
                                    className="reset-svg h-5 w-5 sm:h-7 sm:w-7 mb-2 mr-3 sm:mr-2 cursor-pointer"
                                    onClick={handleReset}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Overlay;