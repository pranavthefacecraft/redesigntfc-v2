import './Overlay.css';
import { useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { usePlay } from "./Contexts/Play";
import { Howl } from 'howler';

export default function Overlay() {
    const { 
        play, setPlay, 
        hasScroll, 
        end, 
        cardFlipped, 
        setCardFlipped,
        cloudsColor,
        setCloudsColor,
        skyColor,
        setSkyColor,
        lightColor,
        setLightColor,
        rangevalue,
        setRangevalue,
        resetAllValues,
        playAudio,
        setPlayAudio
    } = usePlay();

    const soundRef = useRef()

    useLayoutEffect(() => {
      // Create audio instance only once
      if (!soundRef.current) {
            soundRef.current = new Howl({
                src: ['/Launch/audio.mp3'], // Replace with your audio file path
                loop: true,
                html5: true,
                volume: 0.08
            });
      }

      return () => {
            // Cleanup on unmount
            if (soundRef.current) {
                soundRef.current.stop();
            }
      };
    }, [])

    // Control audio based on playAudio state and end condition
    useEffect(() => {
        if (!soundRef.current) return;

        if (playAudio && end) {
            soundRef.current.play();
        } else {
            soundRef.current.pause();
        }
    }, [playAudio, end]);


    // Toggle audio play/pause
    const toggleAudio = useCallback(() => {
        setPlayAudio(!playAudio);
    }, [playAudio, setPlayAudio]);



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
            rangeValueRef.current.innerHTML = '0.50';
        }
    }, [resetAllValues]);

    

    useEffect(() => {
      const chatbotWidget = document.querySelector("#ai-chat-widget-container");
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
    
    return (
        <div className={`overlay select-none absolute top-0 left-0 bottom-0 right-0 ${play ? "overlay--disable" : ""} ${hasScroll ? "overlay--scrolled" : ""}`}>
            <div className={`intro w-full h-full flex flex-col justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-0 ${play ? "intro--disappear" : ""}`}>
                <div className="intro-logo w-1/2 aspect-auto absolute top-[40vh] sm:top-[32vh]">
                    <img src="/Launch/images/Whitelogo.png" alt="tfc logo" className="image-contain"/>
                </div>
                <button
                    className="explore text-[12px] px-[0.9rem] py-[0.4rem] sm:px-[1rem] sm:py-[0.5rem] sm:text-[14px] lg:px-[2rem] lg:py-[1rem] lg:text-[18px] rounded-[32px] mt-[200px] sm:mt-[220px] lg:mt-[320px] hover:scale-[1.05] transition-all duration-400 ease-in-out"
                    onClick={() => {
                        setPlay(true);
                    }}
                >
                    Begin
                </button>
            </div>

            {/* Outro Section */}
            <div className={`outro-wrapper absolute inset-0 w-full h-full perspective-[1500px] justify-center items-center flex flex-col text-[12px] md:text-[18px] ${end ? "outro-wrapper--appear" : ""}`}>

                <div className={`outro-content relative aspect-[16/9] w-[90%] sm:w-[80%] md:w-[65%] lg:w-[55%] xl:w-[50%] 2xl:w-[40%] rounded-3xl sm:rounded-4xl ${cardFlipped ? "outro-content--flipped" : ""}`}>

                    <div className={`liquidGlass-overlay absolute inset-0 w-full h-full rounded-3xl sm:rounded-4xl liquidGlass-effect ${end ? "liquidGlass-effect--active" : ""}`}/>

                    {/* Front Side */}
                    <div className="front-side absolute w-full h-full rounded-3xl sm:rounded-4xl grid place-items-center text-center p-3 lg:p-0 gap-4 sm:gap-0">

                      <div className="tfclogo px-3 xl:px-6 2xl:px-9">
                        <img src="/Launch/images/Whitelogo.png" draggable="false" alt="tfc logo" className="tfc-logo image-contain"/>
                      </div>
                           
                      <div className="tfc-text-arrow items-center flex flex-col gap-1 sm:gap-2">    
                        <p className="tfc-text">
                         Our new site's in the clouds for now. <br/> Launching soon!
                        </p>
  
                        <div className="arrow-tfc cursor-pointer w-5 h-5 sm:w-8 sm:h-8 mt-2 lg:mt-3 sm:mt-0" onClick={() => setCardFlipped(!cardFlipped)}>
                         <img src="/Launch/images/arrow.svg" alt="arrow" className="image-contain arrow-image"/>
                        </div>
                      </div>

                      
                        
                    </div>

                    {/* Back Side */}
                    <div className="back-side absolute w-full h-full rounded-3xl sm:rounded-4xl grid place-items-center p-3 md:text-[13px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
                        
                       <div className="tfc-text text-center hidden md:block">
                          <p className="text">Waiting doesn't have to be boring. Our interactive cloud background <br/> is all yours to explore while we prepare the full experience</p>
                       </div>

                       <div className="tfc-panel grid grid-rows-2 w-full gap-1 md:gap-0">
                          <div className="tfc-upper-panel block md:hidden">
                            <div className="cloudSpeed flex flex-col items-center gap-1">
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
                          </div>

                          <div className="tfc-lower-panel w-full grid grid-cols-3 md:grid-cols-4 gap-auto text-center">

                             <div className="cloudSpeed flex flex-col items-center hidden md:block">
                                <p className="label">Cloud Speed</p>
                                <div className="empty-wrap flex flex-col items-center gap-3 xl:gap-2 mt-2">
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
                            </div>

                             <div className="cloudColor flex flex-col items-center gap-1">
                                <p className="label">Cloud Color</p>
                                <div className="input-wrap">
                                  <input 
                                    type="color" 
                                    className="colorpicker"
                                    value={cloudsColor}
                                    onChange={handleCloudsColorChange}
                                  />
                                </div>
                            </div> 

                            <div className="skyColor flex flex-col items-center gap-1">
                                <p className="label">Sky Color</p>
                                <div className="input-wrap">
                                  <input 
                                    type="color" 
                                    className="colorpicker"
                                    value={skyColor}
                                    onChange={handleSkyColorChange}
                                  />
                                </div>
                            </div> 

                            <div className="lightColor flex flex-col items-center gap-1">
                                <p className="label">Light Color</p>
                                <div className="input-wrap">
                                  <input 
                                    type="color" 
                                    className="colorpicker"
                                    value={lightColor}
                                    onChange={handleLightColorChange}
                                  />
                                </div>
                            </div> 

                          </div>
                       </div>

                       <div className="tfc-options w-full px-2">
                          
                          <div className="tfc-lower-panel flex flex-row justify-between px-3 md:px-11">

                            <div className="arrow-tfc w-3 h-3 sm:w-5 sm:h-5 mt-1 lg:mt-2 sm:mt-0">
                            </div>

                            <div className="arrow-tfc cursor-pointer w-5 h-5 sm:w-8 sm:h-8 mt-2 lg:mt-3 sm:mt-0" onClick={() => setCardFlipped(!cardFlipped)}>
                              <img src="/Launch/images/arrow.svg" alt="arrow" className="image-contain arrow-image"/>
                            </div>

                            <div className="reset-tfc cursor-pointer w-3 h-3 sm:w-6 sm:h-6 mt-3 lg:mt-4 sm:mt-1" onClick={handleReset}>
                              <img src="/Launch/images/refresh.png" alt="arrow" className="image-contain arrow-image"/>
                            </div>

                          </div>

                       </div>

                    </div>
                </div>

                <div className="sound-button absolute left-4 bottom-6 sm:left-6 sm:bottom-6 sm:h-10 sm:w-10 h-8 w-8">
                  <img src="/Launch/images/sound.png" alt="sound" className="sound-image image-contain" onClick={toggleAudio}/>
                </div>

            </div>

        </div>
    )
};

