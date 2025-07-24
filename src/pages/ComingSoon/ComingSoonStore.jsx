import { create } from "zustand"

const useComingSoonStore = create((set) => ({
  // State for button click
  isButtonClicked: false,

  // State for image transition animation
  isImageTransitionActive: false,

  // State for material fade
  isMaterialFadeActive: false,

  cameraSpring: {
    fov: 30,
    lookX: 0,
    lookY: -1,
    lookZ: 0,
  },
  setCameraSpring: (spring) => set({ cameraSpring: spring }),

  // Actions
  handleButtonClick: () => set(() => ({
    isButtonClicked: true
  })),

  resetButtonState: () => set(() => ({
    isButtonClicked: false
  })),

  // Actions for image transition
  triggerImageTransition: () => set(() => ({
    isImageTransitionActive: true
  })),
  resetImageTransition: () => set(() => ({
    isImageTransitionActive: false
  })),

  // Actions for material fade
  triggerMaterialFade: () => set({ isMaterialFadeActive: true }),
  resetMaterialFade: () => set({ isMaterialFadeActive: false }),

  // New state for camera animation
  cameraAnimationFinished: false,
  setCameraAnimationFinished: (value) => set({ cameraAnimationFinished: value }),

  cameraLookAt: [0, -1, 0],
  setCameraLookAt: (lookAt) => set({ cameraLookAt: lookAt }),

  cameraFov: 30,
  setCameraFov: (fov) => set({ cameraFov: fov }),

  // New variable for Cube022Cloud GSAP trigger
  cube022CloudGsapTriggered: false,
  setCube022CloudGsapTriggered: (value) => set({ cube022CloudGsapTriggered: value }),
}))

export default useComingSoonStore