import { create } from 'zustand'

const useMouseStore = create((set) => ({
  mouse: { x: 0, y: 0 },
  setMouse: (mouse) => set({ mouse }),
}))

export default useMouseStore