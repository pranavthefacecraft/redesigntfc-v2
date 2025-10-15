import { createContext, useContext, useState } from "react";

const Context = createContext();

export const PlayProvider = ({ children }) => {
  const [play, setPlay] = useState(false);
  const [end, setEnd] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [renderTarget, setRenderTarget] = useState(null);
  const [cardFlipped, setCardFlipped] = useState(false);
  
  // Zustand store logic transferred here
  const [rangevalue, setRangevalue] = useState(0.5);
  const [cloudsColor, setCloudsColor] = useState("#fdcabf");
  const [lightColor, setLightColor] = useState("#ff6633");
  const [skyColor, setSkyColor] = useState("#C295B8");
  const [sunColor, setSunColor] = useState("#ffffff");
  const [playAudio, setPlayAudio] = useState(true);

  const resetAllValues = () => {
    setCloudsColor("#fdcabf");
    setRangevalue(0.5);
    setSunColor("#ffffff");
    setSkyColor("#C295B8");
    setLightColor("#ff6633");
  };

  return (
    <Context.Provider
      value={{
        play,
        setPlay,
        end,
        setEnd,
        hasScroll,
        setHasScroll,
        renderTarget,
        setRenderTarget,
        cardFlipped,
        setCardFlipped,
        // Zustand store values and functions
        rangevalue,
        setRangevalue,
        cloudsColor,
        setCloudsColor,
        lightColor,
        setLightColor,
        skyColor,
        setSkyColor,
        sunColor,
        setSunColor,
        resetAllValues,
        playAudio,
        setPlayAudio
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePlay = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("usePlay must be used within a PlayProvider");
  }

  return context;
};