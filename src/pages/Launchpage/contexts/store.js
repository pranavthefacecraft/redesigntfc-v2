import { create } from "zustand";

const useStore = create((set) => ({
  play: false,
  setPlay: (value) => set({ play: value }),

  end: false,
  setEnd: (value) => set({ end: value }),

  hasScroll: false,
  setHasScroll: (value) => set({ hasScroll: value }),

  spinnerscalehover: null,
  setSpinnerScaleHover: (value) => set({ spinnerscalehover: value }),

  cardFlipped: false,
  setCardFlipped: (value) => set({ cardFlipped: value }),

  rangevalue: 0.4,
  setRangevalue: (value) => set({ rangevalue: value }),

  // Color picker states
  cloudsColor: "#fdcabf",
  setCloudsColor: (value) => set({ cloudsColor: value }),

  lightColor: "#ff6633",
  setLightColor: (value) => set({ lightColor: value }),

  skyColor: "#C295B8",
  setSkyColor: (value) => set({ skyColor: value }),

  // Reset function to restore all values to defaults
  resetAllValues: () => set({
    cloudsColor: "#fdcabf",
    rangevalue: 0.4,
    sunColor: "#ffffff",
    skyColor: "#C295B8",
    lightColor: "#ff6633",
  }),

  playSound: true,
  setPlaySound: (value) => set({ playSound: value }),

  cloudsTexture: null,
  setCloudsTexture: (value) => set({ cloudsTexture: value }),


  trialcloudTexture: null,
  setTrialCloudTexture: (value) => set({ trialcloudTexture: value }),

  scrollOffset: 0,
  setScrollOffset: (value) => set({ scrollOffset: value }),

}));

export default useStore;