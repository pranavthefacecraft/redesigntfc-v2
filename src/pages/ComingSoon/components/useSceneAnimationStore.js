import { create } from 'zustand'

const useSceneAnimationStore = create((set) => ({
  playCameraAnimation: false,
  setPlayCameraAnimation: (val) => set({ playCameraAnimation: val }),
}))

export default useSceneAnimationStore