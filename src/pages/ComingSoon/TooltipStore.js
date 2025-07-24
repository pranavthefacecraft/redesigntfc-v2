import { create } from "zustand"

const useTooltipStore = create((set) => ({
  tooltipVisible: false,
  mouse: { x: 0, y: 0 },
  forceHide: false,
  setTooltipVisible: (visible) => set({ tooltipVisible: visible }),
  setMouse: (mouse) => set({ mouse }),
  setForceHide: (forceHide) => set({ forceHide }),
}))

export default useTooltipStore